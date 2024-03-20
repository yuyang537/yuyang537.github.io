try {
    // 引入文件系统模块
    const fs = require('fs');
    // 读取 _config.yml 文件
    const configContent = fs.readFileSync('D:\\blog-test\\blog-test\\themes\\amazing\\_config.yml', 'utf8');
    // 解析 YAML 格式的配置文件内容
    const config = require('js-yaml').safeLoad(configContent);
    // 从配置文件中获取 live 变量的值
    const hasLive2D = config.has_live_2D_switch === 'on';

    // 判断 live 变量的值是否为 true
    if (hasLive2D) {
        $("<link>").attr({ href: "/live2d/waifu.css?v=1.4.2", rel: "stylesheet", type: "text/css" }).appendTo('head');
        $('body').append('<div class="waifu"><div class="waifu-tips"></div><canvas id="live2d" class="live2d"></canvas><div class="waifu-tool"><span class="fui-home"></span> <span class="fui-chat"></span> <span class="fui-eye"></span> <span class="fui-user"></span> <span class="fui-photo"></span> <span class="fui-info-circle"></span> <span class="fui-cross"></span></div></div>');
        $.ajax({
            url: "/live2d/waifu-tips.js?v=1.4.2", dataType: "script", cache: true, success: function () {
                $.ajax({
                    url: "/live2d/live2d.js?v=1.0.5", dataType: "script", cache: true, success: function () {
                        /* 可直接修改部分参数 */
                        live2d_settings['hitokotoAPI'] = "hitokoto.cn";  // 一言 API
                        live2d_settings['modelId'] = 6;                  // 默认模型 ID 1,6
                        live2d_settings['modelTexturesId'] = 3;          // 默认材质 ID 6-3,7,2,1-87,1-42,1-2兔子，1-81，1-30羊
                        live2d_settings['modelStorage'] = false;         // 不储存模型 ID
                        /* 在 initModel 前添加 */
                        initModel("/live2d/waifu-tips.json");
                    }
                });
            }
        });
    }
} catch (err) { console.log("[Error] JQuery is not defined.") }
