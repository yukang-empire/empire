
import Fly from 'flyio/dist/npm/wx';
const fly = new Fly();
//默认域名
const domain = "https://manage.technologyle.com"
fly.config.baseURL = domain;


export default fly;