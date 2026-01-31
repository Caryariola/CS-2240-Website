import Image from "next/image";
export default function HomepagePhoto(props : any) {
  return (
    <>
    <style dangerouslySetInnerHTML={{ __html: `
                :root {
                    --dynamic-bg: url('${props.image}');
                }
            `}} />
      <div className="p-2 w-full  h-60 " id="home">
        <div className="  opacity-70 w-full h-full ">
          {/* <Image
            src="https://image1.jdomni.in/banner/13062021/0A/52/CC/1AF5FC422867D96E06C4B7BD69_1623557926542.png"
            alt="Background Image"
            fill priority 
            className="object-cover object-center "
          /> */}
        </div>
        
        
      </div>
    </>
  );
}
