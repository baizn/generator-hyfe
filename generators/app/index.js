var generator = require('yeoman-generator')
var path = require('path')
var colors = require('colors');
var prompts = require('./prompts')

/**
 * 执行顺序：
 *  1 initializing - Your initialization methods
 *  2 prompting - Where you prompt users for options
 *  3 configuring - Saving configurations and configure the project
 *  4 default - If the method name doesn't match a priority, it will be pushed to this group
 *  5 writing - Where you write the generator specific files
 *  6 conflicts - Where conflicts are handled
 *  7 install - Where installation are run
 *  8 end - Called last, cleanup, say good bye
 */
module.exports = generator.Base.extend({
    constructor: function() {
        generator.Base.apply(this, arguments)
        this.params = {}
        /**
         * arguments
         * yo hyfe projectName
         */ 
        this.argument('appname', {
            type: 'String',
            required: false,
            //是否可选
            optional: false,
            desc: 'appname',
            defaults: 'hyfe'
        })

        /**
         * options
         * yo hyfe --react
         */
        this.option('react', {
            desc: 'react',
            alias: 'rt',
            type: 'String',
            defaults: 'react',
            hide: false
        })
        this.options.force = true
    },

    prompting: {
        questions: function () {
            var next = this.async()
            return this.prompt(prompts).then(function (answers) {
                this.params = answers//JSON.stringify(answers, null, ' ')
                if(!answers.create) return
                var rootPath = this.destinationRoot()
                if(path.basename(rootPath) !== answers.name) {
                    this.destinationRoot(path.join(rootPath, answers.name))
                }
                next()
            }.bind(this)) 
        }
    },

    writing: {
        copyProject: function () {
            if(!this.params.create) return
            this.fs.copyTpl(
                this.templatePath('node-server'),
                this.destinationPath(),
                {
                    stat: true
                }
            ) 
            // if(this.params.projectType[0] === 'server') {
            //     this.fs.copyTpl(
            //         this.templatePath('server'),
            //         this.destinationPath()
            //     ) 
            // } else {
            //     this.fs.copyTpl(
            //         this.templatePath('client'),
            //         this.destinationPath()
            //     ) 
            // } 
        }
        
    },
    method1: function() {
       // var type = this.params.projectType[0]
        var packageFilePath = this.templatePath('node-server/package.json')
        // if(type === 'server') {
        //     packageFilePath = this.templatePath('server/package.json')
        //     //pkg = this.fs.readJSON(this.templatePath('server/package.json'), {})
        // } else {
        //     packageFilePath = this.templatePath('client/package.json')
        //     //pkg = this.fs.readJSON(this.templatePath('client/package.json'), {})
        // }

        var pkg = this.fs.readJSON(packageFilePath, {})
        pkg.name = pkg.name || this.params.name
        pkg.author = pkg.author || this.params.author
        pkg.description = pkg.description || this.params.description
        pkg.repository = {
            "type": "git",
            "url": this.params.gitUrl
        }

        pkg.keywords = this._merge(pkg.keywords, this.params.keywords.split(/\s+/))
        
        this.fs.writeJSON(packageFilePath, pkg)
    },

    conflicts: function(file) {
        //generator.Conflicter(file, 'force')
        //generator.conflicter.force = true
        // generator.config.set({

        // })
    },
    end: function () {
        this.log(('===================项目基本信息===================').bgCyan)
        this.log(('Project "' + this.params.name + '" generator success').green.bold)
        this.log(('    $cd ' + this.params.name).gray)
        this.log(('    $npm install').gray)
        this.log(('    $npm start').gray)
        this.log(('Visit url: http://localhost:3000').underline.gray);
    },

    _merge: function (arr, arr2) {
        arr = arr || [];
        arr2 = arr2 || [];
        arr2.forEach(function (item) {
            if (arr.indexOf(item) != -1) {
                arr.push(item);
            }
        });
        return arr;
    }
})