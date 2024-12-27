"use server"

interface saveImageParams {
    params: string
}

export const saveImage = async (params: saveImageParams) => {
    console.log(params)
}