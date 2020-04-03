const inquirer = require("inquirer");
// const { QUESTIONS, TEMPLATE_TYPE } = require("./const");
const download = require("download-git-repo");
const fse = require("fs-extra");
const ora = require("ora");
const path = require("path");
const chalk = require("chalk");

const log = console.log;

const downloadTemplatePath = path.join(__dirname, "template");
class CreateBlock {
  constructor(path, remove) {
    this.path = path || process.cwd();
    this.remove = remove;
  }

  // async getAnswers() {
  //   let answer = await inquirer.prompt(QUESTIONS);
  //   return answer;
  // }

  async downloadFromGit(repository, destination) {
    // 判断文件是否存在，如果文件目录存在会报（git clone failed with status 128）
    return new Promise((resolve, reject) => {
      if (this.isDirExited(destination)) {
        log("The template file already exists");
        resolve(true);
      } else {
        const spinner = ora("Downloading template...");
        spinner.start();
        download(repository, destination, { clone: true }, err => {
          if (err) {
            spinner.fail("Failed to download repo " + err.message.trim());
            return reject(err);
          }
          spinner.succeed("template downloaded successfully");
          return resolve(true);
        });
      }
    });
  }

  // 判断目录是否存在
  isDirExited(path) {
    return fse.existsSync(path);
  }
  // 拷贝模板
  copyTemplate(src, desc) {
    if (this.isDirExited(desc)) {
      log(chalk.red("this template exists"));
      process.exit();
    }
    fse
      .ensureDir(desc)
      .then(() => {
        log(chalk.green("Template file generated successfully"));
        fse.copySync(src, desc);
      })
      .catch(err => {
        log(chalk.red("Template file generation failed"), err);
      });
  }
  // 移除模板文件
  async removeTemplate(path) {
    return new Promise((resolve, reject) => {
      fse
        .remove(path)
        .then(() => {
          log(chalk.green("Template file delete successfully"));
          resolve();
          process.exit();
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  }

  async run() {
    // 1、git clone template;  2 copy template
    if (this.remove) {
      await this.removeTemplate(downloadTemplatePath);
    }
    await this.downloadFromGit(
      "https://github.com:LJJCherry/create-react-app-template#master",
      downloadTemplatePath
    );
    // const answers = await this.getAnswers();
    // const { type } = answers;
    const desc = path.join(this.path, "test");
    this.copyTemplate(downloadTemplatePath, desc);
  }
}

module.exports = CreateBlock;
