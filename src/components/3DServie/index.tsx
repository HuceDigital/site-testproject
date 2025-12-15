"use client";
import { useState, useRef } from "react";
import Spline from "@splinetool/react-spline";
import ServiceItem from "./ServiceItem";

export default function ThreeDService() {
  const [b1, setB1] = useState(false);
  const [b2, setB2] = useState(false);
  const [activeService, setActiveService] = useState("schilderwerk");
  const splineAppRef = useRef<any>(null);
  const splineObjectRef = useRef<any>(null);

  const handleSplineLoad = (splineApp: any) => {
    splineAppRef.current = splineApp;
    splineApp.setVariable("b1", b1);
    splineApp.setVariable("b2", b2);

    const resetObject = splineApp.findObjectByName("Wall");
    splineObjectRef.current = resetObject;
  };

  const resetSplineScene = () => {
    if (splineObjectRef.current) {
      splineObjectRef.current.emitEvent("mouseDown", "__reset__");
    }
  };

  const setWallpaper = () => {
    resetSplineScene();
    setB1(true);
    setB2(true);
    setActiveService("wallpaper");

    setTimeout(() => {
      if (splineAppRef.current) {
        splineAppRef.current.setVariable("b1", true);
        splineAppRef.current.setVariable("b2", true);
      }
    }, 100);
  };

  const setSchilderwerk = () => {
    resetSplineScene();
    setB1(true);
    setB2(false);
    setActiveService("schilderwerk");

    setTimeout(() => {
      if (splineAppRef.current) {
        splineAppRef.current.setVariable("b1", true);
        splineAppRef.current.setVariable("b2", false);
      }
    }, 100);
  };
  const setKitwerk = () => {
  
    resetSplineScene();
    setB1(true);
    setB2(false);
    setActiveService("kitwerk");

    setTimeout(() => {
      if (splineAppRef.current) {
        splineAppRef.current.setVariable("b1", true);
        splineAppRef.current.setVariable("b2", false);
      }
    }, 100);
  };



  const setGlass = () => {
    resetSplineScene();
    setB1(false);
    setB2(false);
    setActiveService("glass");

    setTimeout(() => {
      if (splineAppRef.current) {
        splineAppRef.current.setVariable("b1", false);
        splineAppRef.current.setVariable("b2", true);
        setTimeout(() => {
          if (splineAppRef.current) {
            splineAppRef.current.setVariable("b1", false);
            splineAppRef.current.setVariable("b2", false);
          }
        }, 100);
      }
    }, 100);
  };
  

  return (
    <section className="col-span-12 container mx-auto flex items-center justify-center py-8 mt-10 md:-mt-16">
      {/* Main white card */}
      <div className="bg-white rounded-2xl shadow-xl w-full overflow-hidden relative">
        <div className="flex flex-col-reverse lg:flex-row items-center lg:justify-between">
          {/* Left section - Content */}
          <div className=" w-full lg:w-2/3 p-8 flex flex-col justify-center">
            {/* Service buttons */}
            <div className="space-y-3 ">
              <ServiceItem
                title="Schilderwerk"
                description="Professioneel schilderwerk voor binnen en buiten. Wij zorgen voor perfecte afwerking en duurzame resultaten met de beste materialen."
                href="/schilderwerk "
                iconAlt="Schilderwerk"
                isActive={activeService === "schilderwerk"}
                onClick={setSchilderwerk}
              />

              <ServiceItem
                title="Glas zetten"
                description="Professioneel glas zetten voor ramen en deuren. Wij zorgen voor perfecte afwerking en duurzame resultaten."
                href="/glaswerk "
                iconAlt="Glass"
                isActive={activeService === "glass"}
                onClick={setGlass}
              />

              <ServiceItem
                title="Behangen"
                description="Vakkundig behangen van muren met de nieuwste materialen en technieken. Van klassiek tot modern design."
                href="/wandafwerking "
                iconAlt="Wallpaper"
                isActive={activeService === "wallpaper"}
                onClick={setWallpaper}
              />

              <ServiceItem
                title="Kitwerk"
                description="Professioneel kitwerk voor binnen en buiten. Wij zorgen voor perfecte afwerking en duurzame resultaten."
                href="/kitwerk "
                iconAlt="Kitwerk"
                isActive={activeService === "kitwerk"}
                onClick={setKitwerk}
              />
            </div>
          </div>

          {/* Right section - 3D Scene */}
          <div className="w-96 h-96   rounded-lg m-8 overflow-hidden relative ">
            <Spline
              scene="https://prod.spline.design/PYcpd1TpOKmZt0uW/scene.splinecode"
              onLoad={handleSplineLoad}
              style={{
                width: "175%",
                height: "175%",
                position: "absolute",
                top: "-45%",
                left: "-50%",
                transform: "scale(1)",
                transformOrigin: "center center",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
