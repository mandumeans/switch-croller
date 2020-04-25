const axios = require("axios")
const cheerio = require("cheerio")
const log = console.log

const getHtml = async () => {
    try {
        return await axios.get("https://sofrano.com/product/list.html?cate_no=56")
    } catch (error) {
        console.error(error);
    }
}

export default async (req, res) => {
    const SOFRANO_SITE_ADDR = "https://sofrano.com/"
    const ITEM_COUNT = 7
    console.log(req.query.page)

    const result_list = await getHtml().then(html => {
        let ulList = [];
        const $ = cheerio.load(html.data);
        const $bodyList = $("div.ec-base-product ul").children("li.xans-record-")
        
        $bodyList.slice((req.query.page - 1) * ITEM_COUNT, req.query.page * ITEM_COUNT).each(function(i,elem){
            ulList[i] = {
                avatar: $(this).find('div.add_thumb img').attr('src'),
                title: $(this).find('div.add_thumb img').attr('alt'),
                price: $(this).find('ul.xans-product-listitem li span').eq(3).text(),
                link: SOFRANO_SITE_ADDR + $(this).find('div.thumbnail a').attr('href'),
                is_sold_out: true,
            }
        });
        const data = ulList.filter(n => {
            return n.title !== undefined
        });
        return data;
    })

    console.log(result_list)
    res.send(result_list)
}