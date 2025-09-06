import React, { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "bootstrap/dist/css/bootstrap.min.css";
import "remixicon/fonts/remixicon.css";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    id: 1,
    img: "assets/images/card1.png",
    title: "The Algorithm",
    desc: "The algorithm's workings are shrouded in complexity.",
    className: "card1",
  },
  {
    id: 2,
    img: "assets/images/card2.png",
    title: "The Dogma",
    desc: "Enshrining the principles of conformity and reinforcing the status quo.",
    className: "card2",
  },
];

const ExperienceLayout = () => {
  useEffect(() => {
    // Setup Lenis for smooth scrolling
    const lenis = new Lenis({
      autoRaf: true,
    });

    lenis.on("scroll", (e) => {
      console.log(e);
    });

    // GSAP ScrollTrigger animations
    gsap.utils.toArray(".card").forEach((card) => {
      gsap.to(card, {
        opacity: 0,
        scale: 0.7,
        scrollTrigger: {
          trigger: card,
          start: "top 15%",
          end: "bottom 15%",
          scrub: 1,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      lenis.destroy();
    };
  }, []);

  return (
    <div className="maincontainer bg-black container-fluid">
      <main className="px-md-4 px-1 pt-md-5 pb-0">
        {/* Section 1 */}
        <section className="mainsec1 w-100 pt-md-5 mt-md-5">
          <div className="row justify-content-center">
            <div className="col-md-8 col-12">
              <p className="text-white fs-1 text-center">
                As data conglomerates reveled in the opulence of cognitive
                wealth, a silent underclass manifested, condemned to the digital
                periphery.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="mainsec2 w-100 pt-5">
          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-6 col-xxl-4">
              {cards.map((card) => (
                <div
                  key={card.id}
                  className={`${card.className} card mb-5 position-sticky rounded-4 text-white p-5 d-flex flex-column justify-content-center align-items-center`}
                >
                  <img
                    className="object-fit-cover mb-5"
                    width="40%"
                    src={card.img}
                    alt={card.title}
                  />
                  <h1 className="text-center display-5 mb-3 text-uppercase">
                    The <br /> <span>{card.title.split(" ")[1]}</span>
                  </h1>
                  <p className="text-center">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="mainsec3 w-100 pt-md-5 mt-md-5">
          <div className="row justify-content-center h-100">
            <div className="col-md-8 col-12 text-center d-flex flex-column align-items-center justify-content-md-around justify-content-evenly">
              <p className="text-white fs-1">
                Lost in perpetual dependency, inhabitants of the Synthetic Era
                found solace in cryptic simulations, where pain ebbed and
                cognitive loads momentarily lightened.
              </p>
              <img
                className="object-fit-cover"
                width="40%"
                src="assets/images/card3.png"
                alt="Card Illustration"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ExperienceLayout;
