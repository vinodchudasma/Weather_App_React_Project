import React, { useEffect, useState } from 'react'
import img from "./assets/search.svg"
import img1 from "./assets/location.svg"

function Header() {
    const [theme, setTheme] = useState(true);


    const setDarkMode = () => {
        document.querySelector("body").setAttribute("data-theme", "dark");
    };

    const setLightMode = () => {
        document.querySelector("body").setAttribute("data-theme", "light");
    };

    const handleTheme = () => {
        setTheme(!theme);
        if (theme) {
            setDarkMode();
        } else {
            setLightMode();
        }
    };
   
    

    return (
        <>
            <div className="d-flex justify-content-between align-items-center p-3 ">
                <div className="one">
                    <label className="switch">
                        <input type="checkbox" checked={!theme} onChange={handleTheme} />
                        <span className="slider"></span>
                    </label>
                </div>
                <div className="input_box ">
                    <div class="input-group  flex-nowrap">
                        <span class="input-group-text bg_color" id="addon-wrapping"><img src=
                            {img} alt="" /></span>
                        <input type="text" class="form-control bg_color input_width" placeholder="Search for your preffered city..." aria-label="Username" aria-describedby="addon-wrapping" />
                    </div></div>
                <div className="p-2"> <button className='p-1 btn_1'><img src={img1} alt="" />Current location</button></div>
            </div>

        </>
    );
}

export default Header;
