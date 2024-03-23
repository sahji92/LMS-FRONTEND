export const apiEndpoints = {
    REGISTER_ENDPOINT: '/registerUser',
    LOGIN_ENDPOINT: '/userLogin',
    LOGOUT_ENDPOINT: '/userLogout',
    GET_COURSES_ENDPOINT:'/getCourses',
    GET_COURSE_ENDPOINT:'/getCourse',
    GET_ALL_COURSES_ENDPOINT:'/getAllCourses',
    CREATE_COURSE_ENDPOINT:'/createCourse',
    UPDATE_COURSE_ENDPOINT:'/updateCourse',
    UPLOAD_COURSE_IMAGE_ENDPOINT:'/upload',
    UPLOAD_VIDEO_FILES_ENDPOINT:'/videoUploads',
    CREATE_COURSE_VIDEO_ENDPOINT:'/createVideo',
    GET_COURSE_VIDEOS_ENDPOINT:'/getVideos',
    CREATE_ORDER_ENDPOINT:'/createOrder',
    GET_USER_ORDERS_ENDPOINT:'/getOrders'
}

export const httpMethods = {
    POST: 'POST',
    GET: 'GET',
    PUT: 'PUT',
}