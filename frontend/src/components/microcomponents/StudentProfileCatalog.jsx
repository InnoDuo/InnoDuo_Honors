import React from "react";
import stuCatalog from "../../assets/test-json"

const StudentProfileCatalog = () => {
  return (
    <div className="catalog-container">
      <div className="catalog-contents">

        {
            console.log(stuCatalog)
        }

        {
            stuCatalog.map((cat)=>(
                <div className="catalog-content" key={cat.stuID}>
                <label className="catagory-title">{cat.cat1.catName }{ cat.stuID}</label>
                <div className="catagory-lists">{cat.cat1.item1.itemName} - {cat.cat1.item1.itemStatus}</div>
            </div>
            ))
        }
        {/* <div className="catalog-content">
                <label className="catagory-title">Honors Seminar</label>
                <div className="catagory-lists"></div>
            </div>
            <div className="catalog-content">
                <label className="catagory-title">Honors Core Classes</label>
                <div className="catagory-lists"></div>
            </div>
            <div className="catalog-content">
                <label className="catagory-title">Freshman Seminar</label>
                <div className="catagory-lists"></div>
            </div>
            <div className="catalog-content">
                <label className="catagory-title">Research Methodology</label>
                <div className="catagory-lists"></div>
            </div>
            <div className="catalog-content">
                <label className="catagory-title">Honors Project</label>
                <div className="catagory-lists"></div>
            </div>
            <div className="catalog-content">
                <label className="catagory-title">CRACAD Presentation</label>
                <div className="catagory-lists"></div>
            </div>
            <div className="catalog-content">
                <label className="catagory-title">Service Events</label>
                <div className="catagory-lists"></div>
            </div> */}
      </div>
    </div>
  );
};

export default StudentProfileCatalog;
