import { defineComponent, ref } from "vue";
import { RouterView } from "vue-router";
export default defineComponent({
  name: "组件名",
  setup(props, ctx) {
    return {};
  },
  render() {
    return (
      <div>
        <RouterView></RouterView>
      </div>
    );
  },
});
