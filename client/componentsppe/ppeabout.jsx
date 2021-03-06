import React from 'react';

export default function PPEAbout(props) {
  return (
    <section className="container-fluid overflow-hidden">
      <div className="row">
        <div className="col-sm-11 col-12 bg-dark py-5">
          <div className="row py-sm-5">
            <div className="col-lg-2 col-sm-1"></div>
            <div className="col-lg-6 col-sm-8 col-12 text-white text-emphasis">
              <h1>Our Story</h1>
              <p className="story-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique expedita doloribus
              voluptatum architecto, dignissimos dolorem sint cumque atque nostrum quaerat sunt porro
              quae quis est, reprehenderit mollitia eaque minus veritatis! Lorem ipsum dolor, sit amet
              consectetur adipisicing elit. Facere iure, ipsa corrupti maiores reiciendis numquam hic
              similique, quidem recusandae cumque blanditiis magnam aperiam neque! Molestiae et provident
              pariatur tenetur eum.</p>
            </div>
            <div className="col-lg-4 col-3 d-none d-sm-flex"></div>
          </div>
        </div>
        <div className="col-1 bg-lightblue"></div>
      </div>
      <div className="row justify-content-end d-none d-sm-flex">
        <div className="col-10 bg-lightblue h-100-px"></div>
      </div>
      <div className="row ppe-about text-center">
        <div className="col-md-4 col-sm-12 p-5"><i className="fas fa-pump-medical fa-10x pb-3"></i>
          <h5>Feature Text</h5>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit accusamus fugit consequatur
          eius alias veniam, ut temporibus explicabo nesciunt necessitatibus sunt quisquam! Obcaecati ex sequi
          quidem, perferendis unde consequuntur voluptatem!</p>
        </div>
        <div className="col-md-4 col-sm-12 bg-dark text-light p-5"><i className="fas fa-virus-slash fa-10x pb-3"></i>
          <h5>Feature Text</h5>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde hic cupiditate aut recusandae
          laborum id quae saepe vitae illo soluta. Amet perferendis sunt eos impedit dolores illo praesentium
          tempore reprehenderit.</p>
        </div>
        <div className="col-md-4 col-sm-12 bg-lightblue p-5"><i className="fas fa-shield-virus fa-10x pb-3"></i>
          <h5>Feature Text</h5>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt obcaecati laborum repellat alias.
          Ipsa, obcaecati. Ut molestias adipisci vero natus, quibusdam nihil consequatur, obcaecati ipsa repellendus
          non earum? Molestiae, veritatis.</p>
        </div>
      </div>
    </section>
  );
}
