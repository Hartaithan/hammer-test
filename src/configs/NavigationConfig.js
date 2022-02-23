import {
  DashboardOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
  PictureOutlined,
  GiftOutlined,
  ShopOutlined,
  UsergroupAddOutlined,
  MailOutlined,
  SettingOutlined,
  MobileOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { APP_PREFIX_PATH } from "configs/AppConfig";

const mainNavTree = [
  {
    key: "main",
    path: `${APP_PREFIX_PATH}/main`,
    title: "sidenav.main",
    icon: DashboardOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: "dashboards-default",
        path: `${APP_PREFIX_PATH}/dashboard`,
        title: "sidenav.main.dashboard",
        icon: DashboardOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "catalog",
        path: `${APP_PREFIX_PATH}/catalog`,
        title: "sidenav.main.сatalog",
        icon: ShoppingCartOutlined,
        breadcrumb: false,
        submenu: [
          {
            key: "catalog-items",
            path: `${APP_PREFIX_PATH}/catalog/items`,
            title: "sidenav.main.сatalog.items",
            icon: "",
            breadcrumb: false,
            submenu: [],
          },
          {
            key: "catalog-categories",
            path: `${APP_PREFIX_PATH}/catalog/categories`,
            title: "sidenav.main.сatalog.categories",
            icon: "",
            breadcrumb: false,
            submenu: [],
          },
          {
            key: "catalog-collections",
            path: `${APP_PREFIX_PATH}/catalog/collections`,
            title: "sidenav.main.сatalog.collections",
            icon: "",
            breadcrumb: false,
            submenu: [],
          },
          {
            key: "catalog-combo",
            path: `${APP_PREFIX_PATH}/catalog/combo`,
            title: "sidenav.main.сatalog.combo",
            icon: "",
            breadcrumb: false,
            submenu: [],
          },
        ],
      },
      {
        key: "orders",
        path: `${APP_PREFIX_PATH}/orders`,
        title: "sidenav.main.orders",
        icon: ShoppingOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "clients",
        path: `${APP_PREFIX_PATH}/clients`,
        title: "sidenav.main.сlients",
        icon: UserOutlined,
        breadcrumb: false,
        submenu: [
          {
            key: "clients-list",
            path: `${APP_PREFIX_PATH}/clients/list`,
            title: "sidenav.main.сlients.list",
            icon: "",
            breadcrumb: false,
            submenu: [],
          },
          {
            key: "clients-groups",
            path: `${APP_PREFIX_PATH}/clients/groups`,
            title: "sidenav.main.сlients.groups",
            icon: "",
            breadcrumb: false,
            submenu: [],
          },
        ],
      },
      {
        key: "banners",
        path: `${APP_PREFIX_PATH}/banners`,
        title: "sidenav.main.banners",
        icon: PictureOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "promocodes",
        path: `${APP_PREFIX_PATH}/promocodes`,
        title: "sidenav.main.promocodes",
        icon: GiftOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "offlinespots",
        path: `${APP_PREFIX_PATH}/offlinespots`,
        title: "sidenav.main.offlinespots",
        icon: ShopOutlined,
        breadcrumb: false,
        submenu: [
          {
            key: "offlinespots-list",
            path: `${APP_PREFIX_PATH}/offlinespots/addresses`,
            title: "sidenav.main.offlinespots.addresses",
            icon: "",
            breadcrumb: false,
            submenu: [],
          },
          {
            key: "offlinespots-geozones",
            path: `${APP_PREFIX_PATH}/offlinespots/geozones`,
            title: "sidenav.main.offlinespots.geozones",
            icon: "",
            breadcrumb: false,
            submenu: [],
          },
        ],
      },
      {
        key: "employees",
        path: `${APP_PREFIX_PATH}/employees`,
        title: "sidenav.main.employees",
        icon: UsergroupAddOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "mailing",
        path: `${APP_PREFIX_PATH}/mailing`,
        title: "sidenav.main.mailing",
        icon: MailOutlined,
        breadcrumb: false,
        submenu: [],
      },
    ],
  },
];

const systemNavTree = [
  {
    key: "system",
    path: `${APP_PREFIX_PATH}/system`,
    title: "sidenav.system",
    icon: SettingOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: "settings",
        path: `${APP_PREFIX_PATH}/settings`,
        title: "sidenav.system.settings",
        icon: SettingOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "mobile",
        path: `${APP_PREFIX_PATH}/mobile`,
        title: "sidenav.system.mobile",
        icon: MobileOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "logs",
        path: `${APP_PREFIX_PATH}/logs`,
        title: "sidenav.system.logs",
        icon: FileTextOutlined,
        breadcrumb: false,
        submenu: [],
      },
    ],
  },
];

const navigationConfig = [...mainNavTree, ...systemNavTree];

export default navigationConfig;
