import JWT_API from "./axioWithAuth";

export const deleteAccount = () => JWT_API.delete("/api/user/delete");