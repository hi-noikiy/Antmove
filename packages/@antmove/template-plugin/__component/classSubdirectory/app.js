const utils = require('../../api/utils');
const { warnLife } = utils;
const getUrl = function () {
    let pages = getCurrentPages();
    let url = pages[pages.length - 1].__route__;
    let _arr = url.split('/');
    let _name = _arr[_arr.length - 1];
    tt.setStorageSync({
        key: '_pageMsg',
        data: {
            pageName: _name,
            pagePath: url
        }
    });
};

module.exports = {
    processTransformationApp (_opts, options) {
        _opts = Object.assign(_opts, options);
        _opts.onLaunch = function (res) {
            tt.clearStorageSync({
                key: "logInfo"
            });
            tt.clearStorageSync({
                key: "_pageMsg"
            });
            getUrl();   
            let body = {};
            function pre (params = {}) {
                return utils.defineGetter(params, body.params, function (obj, prop) {
                    warnLife(`onLaunch's return value is not support ${prop} attribute!`, `onLaunch/${prop}`);
                });
            }
            if (options.onLaunch) {
                body = {
                    params: {
                        scene: {
                            type: 0,
                            desc: "missing"
                        },
                        shareTicket: {
                            type: 0,
                            desc: "missing"
                        }
                    }
                };
                res = pre(res);

                if (typeof options.data === 'function') {
                    options.data = options.data();
                }

                options.onLaunch.call(this, res);
            }
        };
        _opts.onShow = function (res) {
            let body = {};
            function pre (params = {}) {
                return utils.defineGetter(params, body.params, function (obj, prop) {
                    warnLife(`onShow's return value is not support ${prop} attribute!`, `onShow/${prop}`);
                });
            }
            if (options.onShow) {
                body = {
                    params: {
                        scene: {
                            type: 0,
                            desc: "missing"
                        },
                        shareTicket: {
                            type: 0,
                            desc: "missing"
                        }
                    }
                };
                res = pre(res);
                options.onShow.call(this, res);
            }
        };
        _opts.onHide = function () {
            if (options.onHide) {
                warnLife('', 'app/onHide');
                options.onHide.call(this);
            }
        };
        if (options.onError) {
            _opts.onError =function () {
                options.onError.call(this);
            };
        }
    }
};