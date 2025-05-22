import { defineComponent, ref, onMounted } from "vue";
import { http } from "@utils/http/index";
import { Button } from "ant-design-vue";
export default defineComponent({
  name: "Section",
  setup(props, ctx) {
    const dataSource = ref();

    const getData = async () => {
      const res = await http.post("/data");
      console.log(res);
      dataSource.value = res;
    };
    return {
      dataSource,
      getData,
    };
  },
  render() {
    return (
      <div>
        <Button onClick={this.getData}>获取数据</Button>
      </div>
    );
  },
});
