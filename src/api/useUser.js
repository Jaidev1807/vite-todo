import axios from "axios";
import { useQuery } from "react-query";
export default function UseUser(id) {
  return useQuery(["repoData", id], async () => {
    return await axios.get("https://jsonplaceholder.typicode.com/todos/" + id);
  });
}
