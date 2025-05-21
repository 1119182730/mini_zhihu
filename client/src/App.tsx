import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "组件名",
  setup(props, ctx) {
    const demo = "1111";
    return {
      demo,
    };
  },
  render() {
    return <div>mini知乎</div>;
  },
});
