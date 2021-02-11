import "material-design-icons-iconfont/dist/material-design-icons.css";
import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "md",
  },
  theme: {
    themes: {
      light: {
        //primary: colors.indigo.darken4,
        primary: colors.green,
        secondary: colors.shades.white
      },
      dark: {
        secondary: colors.shades.black
      }
    }
  }
});
