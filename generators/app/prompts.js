var inquirer = require('inquirer')

module.exports = [
    {
        type: 'input',
        name: 'name',
        message: 'Your Project Name: ',
        default: this.appname,
        //记住用户喜好
        store: true
    }, 
    {
        type: 'checkbox',
        message: '项目类型: ',
        name: 'projectType',
        choices: [
            {
                value: 'client',
                name: 'React客户端渲染',
                checked: true
            },
            {
                value: 'server',
                name: 'React服务端渲染'
            }
        ]
    },
    // {
    //     type: 'rawlist',
    //     name: 'rawlist',
    //     message: 'choices them',
    //     choices: ['bzn', 'yxl', 'bzd']
    // },
    // {
    //     type: 'list',
    //     name: 'list',
    //     message: 'choices them',
    //     choices: ['bzn', 'yxl', 'bzd']
    // },
    {
        type: 'input',
        message: 'Git repository: ',
        name: 'gitUrl'
    },
    {
        type: 'input',
        message: 'Description: ',
        name: 'description'
    },
    {
        type: 'input',
        message: 'Author: ',
        name: 'author',
        store:true
    },
    {
        type: 'input',
        message: 'Keywords: ',
        name: 'keywords'
    },
    {
        type: 'confirm',
        name: 'create',
        message: 'Are you sure you create the project now?'
    }
];
