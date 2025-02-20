import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import CarCard3 from './CarCard3'; // Ensure this component exists

const YourComponent = () => {
    const [allTemps, setAllTemps] = useState(); // Stores products per category

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/category', { cache: 'no-store' });
            if (response.ok) {
                const data = await response.json();
                setAllTemps(data);
            } else {
                console.error('Failed to fetch categories');
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };





    return (
        <div className="ProvidersIfSelectedProductMatchesFilter mt-4">

            <content-block slug="product-page-wssb">
                <div className="ProductTile-SliderContainer ProductTile-SliderContainer--YMAL">

                    {allTemps && Object.keys(allTemps).length > 0 ? (

                        <>

                            <style dangerouslySetInnerHTML={{
                                __html: ".ProductTile-SliderContainer--YMAL .ProductTile-SliderContainer-Title{height:auto;text-align:center; }  "
                            }} />






                            <div className="  ProductTile-SliderContainer ProductTile-SliderContainer--YMAL px-3" data-product-list-category="ymal-slider">

                                <div className="ProductTile-SliderContainer-Title br_text-3xl-serif br_text-[#333] "   >
                                     <h1>Our Categories</h1> 
                                </div>

                                {allTemps.length > 0 ? (
                                    <section className=' mb-5' style={{ maxWidth: "100%" }}>
                                        <Swiper
                                            spaceBetween={5}
                                            modules={[Autoplay]}
                                            autoplay={{
                                                delay: 3000,
                                                disableOnInteraction: false,
                                            }} loop breakpoints={{
                                                150: {
                                                    slidesPerView: 2,
                                                },
                                                768: {
                                                    slidesPerView: 3,
                                                },
                                            }}>
                                            <div className="home__cars-wrapper">
                                                {allTemps.map((temp) => (
                                                    <SwiperSlide key={temp.id}>
                                                        <CarCard3 temp={temp} />
                                                    </SwiperSlide>
                                                ))}
                                            </div>
                                        </Swiper>
                                    </section>



                                ) : (
                                    <p>No products available in {category}</p>
                                )}
                            </div>
                        </>

                    ) : (
                        <div className="home___error-container">
                            <h2 className="text-black text-xl font-bold">No products available</h2>
                        </div>
                    )}
                </div>

            </content-block>
        </div>
    );
};

export default YourComponent;
