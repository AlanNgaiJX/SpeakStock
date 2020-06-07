/* 
    移动端cube-ui套件 封装有betterScroll、toast modal、createApi、自定义组件注册等,

    此外该套件还封装有tap事件
*/
function GetFileType(url) {
  if (url != null && url.length > 0) {
    return url.substr(url.lastIndexOf(".")).toLowerCase();
  }
  return "";
}

function loadFile(url, success) {
  var fileObj = null;
  var type = GetFileType(url);

  switch (type) {
    case ".js":
      fileObj = document.createElement("script");
      fileObj.src = url;
      break;

    case ".css":
      fileObj = document.createElement("link");
      fileObj.href = url;
      fileObj.type = "text/css";
      fileObj.rel = "stylesheet";
      break;
    default:
      break;
  }

  fileObj &&
    (fileObj.onload = fileObj.onreadystatechange = function() {
      if (
        !this.readyState ||
        "loaded" === this.readyState ||
        "complete" === this.readyState
      ) {
        success();
      }
    }) &&
    document.getElementsByTagName("head")[0].appendChild(fileObj);
}

function loadFilesAll(urls, allSuccess) {
  if (!urls.length) return;

  var tasks = {};
  var tasksLength = urls.length;
  var exceAllSuccess = false;

  for (let i = 0; i < urls.length; i++) {
    loadFile(urls[i], () => {

      tasks[urls[i]] = {};
      tasks[urls[i]].result = true;

      if (!exceAllSuccess && Object.keys(tasks).length === tasksLength) {
        allSuccess();
        exceAllSuccess = true;
      }
    });
  }
}

var toastMixin = {
  data() {
    return {
      toastMixin_modal: null,
      toastMixin_loading: null,
      toastMixin_toast: null
    };
  },

  methods: {
    // 【显示 loading】
    showLoading(arg) {
      !this.toastMixin_loading &&
        (this.toastMixin_loading = this.$createToast({
          mask: arg.mask || false,
          time: 0,
          type: "loading",
          txt: arg ? arg.title || "" : ""
        })) &&
        this.toastMixin_loading.show();
    },

    // 【隐藏 loading】
    hideLoading() {
      this.toastMixin_loading &&
        this.toastMixin_loading.hide() &&
        (this.toastMixin_loading = null);
    },

    //  【显示toast】
    showToast({ icon, title, duration, mask }) {
      this.toastMixin_toast = this.$createToast({
        mask: mask || false,
        time: duration || 1500,
        type: icon || "loading",
        txt: title || ""
      });
      this.toastMixin_toast.show();
    },

    // 【显示对话框】
    showModal({ title, content, type, success, confirmBtn, cancleBtn }) {
      this.toastMixin_modal = this.$createDialog({
        type: type || "confirm", //'alert' 'confirm'
        title: title,
        content: content,
        icon: "cubeic-alert",
        confirmBtn: confirmBtn || "确认",
        cancleBtn: cancleBtn || "取消",
        $class: {
          modal: true
        },
        onConfirm: () => {
          typeof success === "function" && success({ confirm: true });
        },
        onCancle: () => {
          typeof success === "function" && success({ confirm: false });
        },
        onClose: () => {
          typeof success === "function" && success({ confirm: false });
        }
      });
      this.toastMixin_modal.show();
    }
  }
};

export default {
  install(Vue, components) {
    loadFilesAll(
      [
        "https://cdn-mmdesign.mimoprint.com/mBook/lib/cubeUI-1.12.27/cube.min.js",
        "https://cdn-mmdesign.mimoprint.com/mBook/lib/cubeUI-1.12.27/cube.min.css"
      ],
      () => {
        Vue.use(cube);
        Vue.prototype.BScroll = cube.BScroll;

        Vue.prototype.registCubeComponent = function(components) {
          components.forEach(item => {
            Vue.createAPI(item, true);
          });
        };

        // 注册自定义组件
        components &&
          Object.prototype.toString.call(components) === "[object Array]" &&
          Vue.prototype.registCubeComponent(components);

        // 混入公用方法
        Vue.mixin(toastMixin);
      }
    );
  }
};
