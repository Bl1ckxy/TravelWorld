import React from 'react'
import Slider from 'react-slick'
import ava01 from "../../assets/images/ava-1.jpg"
import ava02 from "../../assets/images/ava-2.jpg"
import ava03 from "../../assets/images/ava-3.jpg"
import ava04 from "../../assets/images/ava-4.jpg"

const Testimonials = () => {

    const settings = {
        dots:true,
        infinite:true,
        autoplay:true,
        speed:1000,
        swipeToSlide:true,
        autoplaySpeed:2000,
        slidesToShow:3,

        responsive:[
            {
                breakpoint: 992,
                settings:{
                    slidesToShow:2,
                    slideToScroll:1,
                    dots:true,
                    infinite:true,
                },
            },
            {
                breakpoint:576,
                settings: {
                    slidesToShow:1,
                    slideToScroll:2,
                },
            }
        ]
    }

  return (
    <Slider {...settings}>
        <div className="testimonials py-4 px-3">
            <p>मला खूप छान वेबसाइट वाटली. मी तुम्हा लोकांनाही शिफारस करेन आणि एकदा नक्कीच प्रयत्न कराआणि मी याला एक ठोस रेटिंग देईन. ही मी वापरलेल्या सर्वोत्तम वेबसाइट्सपैकी एक आहे.
            </p>

            <div className="d-flex align-items-center gap-4 mt-3">
                <img src={ava01} className="w-25 h-25 rounded-2" alt="" />
                <div>
                    <h6 className="mb-0 mt-3">HARSH ROKADE</h6>
                    <p>Customer</p>
                </div>
            </div>
        </div>
        <div className="testimonials py-4 px-3">
            <p>எனக்கு இந்த இணையதளம் மிகவும் அருமையாக இருந்தது. நானும் இதை உங்களுக்குப் பரிந்துரைப்பேன், ஒரு முறை கண்டிப்பாக முயற்சி செய்து பாருங்கள். இதற்கு நான் ஒரு உறுதியான மதிப்பீட்டை வழங்குவேன். இது நான் பயன்படுத்திய சிறந்த இணையதளங்களில் ஒன்றாகும்.
            </p>

            <div className="d-flex align-items-center gap-4 mt-3">
                <img src={ava02} className="w-25 h-25 rounded-2" alt="" />
                <div>
                    <h6 className="mb-0 mt-3">SIDDHI</h6>
                    <p>Customer</p>
                </div>
            </div>
        </div>
        <div className="testimonials py-4 px-3">
            <p>मुझे यह वेबसाइट बहुत अच्छी लगी। मैं आप सबको भी इसकी सलाह दूंगा और एक बार जरूर कोशिश करें। मैं इसे एक मजबूत रेटिंग दूंगा। यह उन बेहतरीन वेबसाइट्स में से एक है जिन्हें मैंने इस्तेमाल किया है।
            </p>

            <div className="d-flex align-items-center gap-4 mt-3">
                <img src={ava04} className="w-25 h-25 rounded-2" alt="" />
                <div>
                    <h6 className="mb-0 mt-3">OM </h6>
                    <p>Customer</p>
                </div>
            </div>
        </div>
        <div className="testimonials py-4 px-3">
            <p>
                مجھے یہ ویب سائٹ بہت اچھی لگی۔ میں آپ سب کو بھی اس کی سفارش کروں گا اور ایک بار ضرور کوشش کریں۔ میں اسے ایک مضبوط ریٹنگ دوں گا۔ یہ ان بہترین ویب سائٹس میں سے ایک ہے جنہیں میں نے استعمال کیا ہے۔
            </p>

            <div className="d-flex align-items-center gap-4 mt-3">
                <img src={ava03} className="w-25 h-25 rounded-2" alt="" />
                <div>
                    <h6 className="mb-0 mt-3">RAAID</h6>
                    <p>Customer</p>
                </div>
            </div>
        </div>
        
    </Slider>
  )
}

export default Testimonials