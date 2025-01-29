import thanks from "../assets/icon-thank-you.svg";

export default function Finish(){
    return (
        <div className="flex items-center justify-center sm:h-full w-11/12 flex-col gap-5 bg-white p-8 rounded-xl max-[640px]:absolute max-[640px]:top-[15%]">
            <img src={thanks} width={"70px"}/>
            <div className="flex items-center justify-center flex-col gap-2">
                <h1 className="text-2xl font-bold">Thanks you!</h1>
                <p className="text-center text-[#9699ab]">
                    Thanks for conferming your subscription!We hope ou have fun using our platform if you ever need support,
                    please feel free to email us at support@loremgaming.com
                </p>
            </div>
        </div>
    )
}