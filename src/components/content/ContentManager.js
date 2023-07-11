import axiosInstance, {axiosInstanceFileUpload} from '../../lib/service/service';

export const getUserList = async () => {
  return await axiosInstance.get('/users');
}

export const searchUserList = async (searchValue) => {
  return await axiosInstance.get(`/users?search=${searchValue}`)
}

export const createUser = async (formValues) => {
  return await axiosInstance.post('/users', formValues);
}

export const updateUser = async (uuid, formValues) => {
  return await axiosInstance.put(`/users/${uuid}`, formValues);
}

export const deleteUser = async (uuid) => {
  return await axiosInstance.delete(`/users/${uuid}`);
}

export const forceDeleteUser = async (uuid) => {
  return await axiosInstance.get(`/users/${uuid}/force-delete`);
}

export const restoreUser = async (uuid) => {
  return await axiosInstance.get(`/users/${uuid}/restore`);
}

export const getVideos = async () => {
  return await axiosInstance.get('/videos');
}

export const getVideoDetails = async (slug) => {
  return await axiosInstance.get(`/videos/${slug}`);
}

export const getVideoWatch = async (slug) => {
  return await axiosInstance.get(`/watch-video/${slug}`);
}

export const createVideo = async (formValues) => {
  return await axiosInstanceFileUpload.post('/videos', formValues);
}

export const updateVideo = async (slug, formValues) => {
  return await axiosInstance.put(`/videos/${slug}`, formValues);
}

export const postTxt = async (formValues) => {
  return await axiosInstance.post('/auth/add-txt', formValues);
}