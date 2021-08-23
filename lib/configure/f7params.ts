import routes from "../routes";

const f7params = {
  theme: "ios",
  // App Name
  name: "Life Record",
  // App id
  id: "com.myapp.test",
  view: {
    stackPages: true, //开启多级缓存
    iosDynamicNavbar: false
    // pushState: true
  },
  dialog: {
    // change default "OK" button text
    buttonOk: "OK",
    buttonCancel: "Cancel"
  },
  routes
};

export default f7params;
