import Vue from 'vue'
import { 
    Button,
    Form,
    FormItem,
    Input,
    Container,
    Aside,
    Main,
    Header,
    TabPane,
    Tabs,
    Avatar,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    Menu,
    MenuItem,
    MenuItemGroup,
    Submenu,
    Divider,
    Table,
    TableColumn,
    Pagination,
    Dialog,
    Switch,
    Drawer,
    Select,
    Option,
    Notification
} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Header)
Vue.use(TabPane)
Vue.use(Tabs)
Vue.use(Avatar)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(Divider)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Switch)
Vue.use(Drawer)
Vue.use(Select)
Vue.use(Option)
Vue.use(Notification)

Vue.prototype.$notify = Notification;