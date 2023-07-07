import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { refreshTokenApi } from "../config/api/refreshTokenApi";
import { postDataTable, updateDataTable } from "../services/table.services";

export const refreshToken = async (id: any, data: any, type: any) => {
  const refresh = await refreshTokenApi();
  if (refresh?.error) {
    Cookies.remove("token");
    Cookies.remove("refreshToken");
    toast.error("Please login again");
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 1000);
  } else {
    if (type === "add") {
      await postDataTable(data);
      toast.success("Success add Data");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    } else if (type === "update") {
      await updateDataTable(id, data);
      toast.success("Success update Data");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    }
  }
};
