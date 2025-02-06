

export const getReserveDetails = async () => {
    try{
        const response = await axiosInstance.get("/reserveDetails");
        return response.data.data;
    }catch(error){
        return error.response
    }
}