import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import hljs from 'highlight.js'
// import 'highlight.js/styles/googlecode.css'
import 'highlight.js/styles/github.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'github-markdown-css'
import {
    Input,
    Button,
    Alert,
    Row,
    Col,
    MessageBox,
    Message,
    Dialog,
    Form,
    FormItem,
    Loading
} from 'element-ui'

Vue.use(Input)
Vue.use(Button)
Vue.use(Alert)
Vue.use(Row)
Vue.use(Col)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Loading)

Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$message = Message

Vue.config.productionTip = false
Axios.defaults.withCredentials = true

Vue.directive('highlight', (el) => {
    let blocks = el.querySelectorAll('pre code')
    blocks.forEach((block) => {
        hljs.highlightBlock(block)
    })
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})
