// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 启动入口文件
Vue.config.productionTip = false // 阻止Vue在浏览器控制台输出"正处在dev模式..."的提示；默认true
Vue.config.silent = false // 关闭日志警告，默认false
Vue.config.devtools = true // 配置Vue-devtools（chrome插件，F12使用）检查代码，默认true（生产版为false）
Vue.config.performance = true // 使浏览器开发者工具可以对组件初始化、渲染、打补丁进行性能追踪；默认false
// Vue.config.keyCodes = {f1: 112, up:[38, 97]} // 给v-on自定义键位别名
// Vue.config.errorHandler = function(err, vm){...} // 全局钩子函数，组件渲染遇到未处理的异常时调用，默认输出堆栈信息
// Vue.config.ignoredElements = [...] // 使Vue忽略在Vue之外的自定义元素，否则会报错Unknown custom element
// Vue.optionMergeStrategies, 用于mixin和Vue.extend()时，对子组件和父组件如有相同属性(option)时的合并策略；默认优先使用子组件的选项

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
