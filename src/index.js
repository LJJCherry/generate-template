const inquirer = require("inquirer");
// const { QUESTIONS, TEMPLATE_TYPE } = require("./const");
const download = require("download-git-repo");
const fse = require("fs-extra");
const ora = require("ora");
const path = require("path");
const chalk = require("chalk");

const log = console.log;

const templatePath = path.join(
  __dirname,
  "template/packages/website",
  "src/pages"
);
const downloadTemplatePath = path.join(__dirname, "template");
class CreateBlock {
  constructor(path, remove) {
    this.path = path || process.cwd();
    this.remove = remove;
  }

  async getAnswers() {
    let answer = await inquirer.prompt(QUESTIONS);
    return answer;
  }

  async downloadFromGit() {
    // 判断文件是否存在，如果文件目录存在会报（git clone failed with status 128）
    return new Promise((resolve, reject) => {
      if (this.isDirExited(downloadTemplatePath)) {
        log("The template file already exists");
        resolve(true);
      } else {
        const spinner = ora("Downloading template...");
        spinner.start();
        download(
          "https://github.com:LJJCherry/create-react-app-template#master",
          downloadTemplatePath,
          { clone: true },
          err => {
            if (err) {
              spinner.fail("Failed to download repo " + err.message.trim());
              return reject(err);
            }
            spinner.succeed("lark-pro template downloaded successfully");
            return resolve(true);
          }
        );
      }
    });
  }

  getTypeDir(type) {
    const keys = Object.keys(TEMPLATE_TYPE);
    let dir = "";
    keys.forEach(key => {
      if (TEMPLATE_TYPE[key].includes(type)) {
        dir = key;
      }
    });
    return dir;
  }

  isDirExited(path) {
    return fse.existsSync(path);
  }

  copyTemplate(name) {
    let sourcePath = "";
    const outPath = path.join(this.path, name);
    if (this.isDirExited(outPath)) {
      log(chalk.red("this type of template exists, please select another one"));
      process.exit();
    }
    if (name === "Edit") {
      sourcePath = path.join(templatePath, name);
    } else {
      sourcePath = path.join(templatePath, `${this.getTypeDir(name)}/${name}`);
    }
    fse
      .ensureDir(outPath)
      .then(() => {
        log(chalk.green("Template file generated successfully"));
        fse.copySync(sourcePath, outPath);
      })
      .catch(err => {
        log(chalk.red("Template file generation failed"), err);
      });
  }

  async removeTemplate(path) {
    return new Promise((resolve, reject) => {
      fse
        .remove(downloadTemplatePath)
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
    // 1、git clone template; 1、 get answer;  3 copy template
    // if (this.remove) {
    //   await this.removeTemplate(downloadTemplatePath)
    // }
    const template = await this.downloadFromGit();
    // const answers = await this.getAnswers();
    // const { type } = answers;
    // this.copyTemplate();
  }
}

module.exports = CreateBlock;
