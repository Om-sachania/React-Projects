import { useEffect, useState } from "react";
import faq from '../api/faq.json';
import './Accordion.css'

const Accordion = ()=>{
    const [apiData,setApiData] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null);
    const handleToggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };
    useEffect(()=>{
        setApiData(faq)
    })
    return(
        <>
            <h1 className="headingTag">Accordion</h1>
            <ul className="section-accordion">
                {apiData.map((curr, index) => {
                    return (
                        <li key={curr.id}>
                            <div className="accordion-grid">
                                <p className="accordion-question">{curr.question}</p>
                                <button onClick={() => handleToggle(index)} className={`${activeIndex === index?'active-btn':''} toggleBtn`}>
                                    {activeIndex === index ? 'Close' : 'Show'}
                                </button>
                            </div>
                            <p>{activeIndex === index && curr.answer}</p>
                        </li>
                    );
                })}
            </ul>
        </>
    )
}

export default Accordion;
