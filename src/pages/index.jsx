import Button from "@/components/Global/Button";
import MiniCard from "@/components/Global/Cards/Mini";
import HeroCard from "@/components/Global/Cards/Hero";
import Input from "@/components/Global/Input";
import Carousel from "@/components/Global/Carousel";
import { useEffect, useState, Fragment } from "react";
import CarouselHeader from "@/components/Global/CarouselHeader";
import { request } from "@/utils/apiHandler";
import withSession from "@/libraries/withSession";
import AnswerModal from "@/components/Global/AnswerModal";
import { useRouter } from "next/router";
import { useUser } from "@/context/user";
import Link from "next/link";

const getPos = i => {
  switch (i) {
    case 4:
      return ['top-0', 'left-0'];
    case 3:
      return ['top-4', 'left-4'];
    case 2:
      return ['top-8', 'left-8'];
    case 1:
      return ['top-12', 'left-12'];
    case 0:
      return ['top-16', 'left-16'];
  };
};

export default function Home({ popularUsers }) {
  const router = useRouter();
  const { user } = useUser();
  return (
    <>
      <div className="flex flex-col items-center justify-center px-10 3xl:px-0">
        <div className="max-w-7xl w-full">
          <div className="w-full flex items-center justify-center gap-36 py-24">
            <div className="lg:max-w-2xl w-full text-center">
              <h1 className="relative text-4xl lg:text-5xl text-black dark:text-white pb-2 leading-20 font-bold">
                Start <span className="text-primary">introducing</span> yourself
                <span className="hidden lg:absolute text-7xl opacity-5 left-0 right-0 top-0 bottom-0 text-primary z-[-1]">introducing</span>
              </h1>
              <p className="text-lg text-gray-500 mt-4 font-medium">
                Make yourself stand out, meet new people and bring new faces to your team. Start introducing yourself to the world.
              </p>
              {user && user.appId ? (
                <div className="flex justify-center w-full mt-6">
                  <Link href="/explore">
                    <Button variant="ghost" className="flex justify-center lg:justify-between items-center border !border-white/0 mt-4 lg:mt-0 w-2/4 lg:w-1/4 group h-[50px] rounded-full">
                      <p className="lg:group-hover:translate-x-6 transition-all duration-200">Explore</p>
                      <i className="fas fa-arrow-right ml-6 lg:ml-2 lg:group-hover:translate-x-12 transition-all duration-200 lg:group-hover:opacity-0" />
                    </Button>
                  </Link>
                </div>
              ) : (
                <form onSubmit={e => {
                  e.preventDefault();
                  router.push('/submit?url=' + encodeURIComponent(e.target.username.value));
                }}>
                  <div className="lg:flex items-center gap-1 mt-4">
                    <Input
                      placeholder={"clqu"}
                      leftContent={<p className="text-gray-500 pt-1">dbio.me/</p>}
                      className="px-1 py-1 w-full h-[50px]"
                      name="username"
                    />
                    <Button variant="default" className="border !border-white/0 w-full lg:w-auto mt-4 lg:mt-0 px-8 h-[50px]">Claim</Button>
                  </div>
                </form>
              )}
            </div>
          </div>

          <div className="w-full mt-20">
            <Carousel
              header={(next, prev, isPrev, isNext) => <CarouselHeader title="Popular Users" icon="fa fa-fire" seeAll={"/explore?sort=likes"} description={"The most popular profiles on dbio.me"} next={next} prev={prev} isPrev={isPrev} isNext={isNext} />}
              slides={popularUsers || []}
            >
              {(data, index) => (
                data.map((entity, index) => (
                  <MiniCard
                    key={index}
                    image={entity.avatar}
                    banner={entity.banner}
                    url={entity.url}
                    username={entity.discord.username}
                    isLiked={entity.isLiked}
                    about={entity.about}
                    isVerified={entity.isVerified}
                  />
                ))
              )}
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = withSession(async (ctx) => {
  try {
    const popularUsersRequest = await request("/entities?sort=likes&limit=12", "GET", null, ctx.req.session.get('access_token'));
    return {
      props: {
        popularUsers: popularUsersRequest?.data?.users || []
      }
    };
  } catch (e) {
    return {
      props: {
        popularUsers: []
      }
    };
  }
});