import React, { useEffect, useState } from 'react';
import img1 from "./assets/sunrise.svg";
import img2 from "./assets/sunset.svg";
import img3 from "./assets/humidity.svg";
import img4 from "./assets/wind.svg";
import img5 from "./assets/pressure-white.svg";
import img6 from "./assets/uv.svg";

function Dashbord() {
    const [data, setData] = useState(null);
    const [location, setLocation] = useState({ lat: null, lon: null });


    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                });
            });
        }
    }, []);
    
    const latitude = location.lat;
    const longitude = location.lon;
    console.log(latitude);
    useEffect(() => {
        fetch(`http://api.weatherapi.com/v1/forecast.json?key=5a5bc2daa49a42e98b5130421251702&q=${location.lat},${location.lon}&days=5&aqi=no&alerts=no`)
            .then(response => response.json())
            .then(data => setData(data))
    }, [location]);

    if (!data) return <p>Loading...</p>;

    const localtime = data?.location?.localtime || "";
    const [date, time] = localtime ? localtime.split(" ") : ["", ""];

    return (
        <div className="dashbord">
            <h1 className='bg-info heading'><marquee behavior="" direction="left">MADE BY VINOD CHUDASMA </marquee></h1>
            <div className="row d-flex justify-content-around p-2">
                <div className="col-xl-3 col-md-12 text-center p-0 m-0">
                    <div className="location p-0 m-0">
                        <p className='location_text pt-4 pb-3'>{data.location.name}</p>
                        <div className="time">
                            <h1 className='time_text mt-4 mb-4'>{time}</h1>
                            <h4 className='date_text pb-3'>{date}</h4>
                        </div>
                    </div>
                </div>
                <div className="col-xl-8 col-sm-12 day_info d-flex justify-content-center text-center">
                    <div className="col-xl-4 col-sm-12 p-0 m-0">
                        <div className="temp p-0">
                            <p className='temp_text pt-1 p-0 m-0'>{data.current.temp_c}'C</p>
                            <p className='temp_feel_text m-0'>
                                Feels like: <b>{data.current.feelslike_c}'C</b>
                            </p>
                            
                                <>
                                    <div className="sunrise d-flex justify-content-center align-items-center mt-2 gap-3">
                                        <img src={img1} alt="sunrise" />
                                        <p className='sunrise_text m-0'><b>Sunrise</b><br />{data.forecast.forecastday[0].astro.sunrise}</p>
                                    </div>
                                    <div className="sunset d-flex justify-content-center align-items-center mt-2 gap-3">
                                        <img src={img2} alt="sunset" />
                                        <p className='sunrise_text m-0'><b>Sunset</b><br />{data.forecast.forecastday[0].astro.sunset}</p>
                                    </div>
                                </>
                        
                        </div>
                    </div>
                    <div className="col-xl-4 col-sm-12 second_data text-center">
                        <div className="condition_img">
                            <img src={data.forecast.forecastday[0].day.condition.icon} alt="weather icon" />
                        </div>
                        <p className='condition_text text-center'>{data.forecast.forecastday[0].day.condition.text}</p>
                    </div>
                    <div className="col-xl-4 col-sm-12">
                        <div className="d-flex justify-content-around mt-3">
                            <div className="humidity pt-3">
                                <img src={img3} alt="" />
                                <p className='humidity_text m-0'><b>{data.current.humidity} %</b></p>
                                <p className='humidity_text'>Humidity</p>
                            </div>
                            <div className="wind_speed pt-2">
                                <img src={img4} alt="" />
                                <p className='humidity_text m-0'><b>{data.current.wind_kph} kph</b></p>
                                <p className='humidity_text'>Wind speed</p>
                            </div>
                        </div>
                        <div className="d-flex justify-content-around mt-1">
                            <div className="humidity pt-3">
                                <img src={img5} alt="" />
                                <p className='humidity_text m-0'><b>{data.current.pressure_mb} mb</b></p>
                                <p className='humidity_text'>Pressure</p>
                            </div>
                            <div className="wind_speed pt-3">
                                <img src={img6} alt="" />
                                <p className='humidity_text m-0'><b>{data.current.uv}</b></p>
                                <p className='humidity_text'>UV</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="forecast">
                <div className="row gap-3 d-flex justify-content-around p-2 text-center">
                    <div className="col-3 forcast_1">
                        <h3 className='day_forecast'><b>5 Days Forecast</b></h3>
                        <div className="row">
                            {data.forecast.forecastday.map((day, index) => (
                                <div key={index} className="text-center d-flex gap-1 m-0 align-items-center">
                                    <div className="col-4 day_forecast"><b>{day.date}</b></div>
                                    <div className="col-4 day_forecast"><img src={day.day.condition.icon} alt="Weather Icon" /></div>
                                    <div className="col-4 day_forecast">{(day.day.maxtemp_c + day.day.mintemp_c) / 2}°C</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-8  forcast">
                        <h3 className='day_forecast'><b>Hourly Forecast:</b></h3>
                        <div className="hourly-container">
                            {data.forecast.forecastday[0].hour.slice(0, 7).map((hour, index) => (
                                <div key={index} className="hourly-card">
                                    <p className="hour-time">{hour.time.split(" ")[1]}</p>
                                    <img src={hour.condition.icon} alt="Weather" className="weather-icon" />
                                    <p className="hour-temp">{hour.temp_c}°C</p>
                                    <p className="hour-wind">{hour.wind_kph} km/h</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashbord;
