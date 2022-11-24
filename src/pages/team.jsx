import Button from "@/components/Global/Button";
import axios from "axios";
import useSWR from "@/hooks/useSWR";
import MiniCard from "@/components/Global/Cards/Mini";
export default function Team() {

  const { data: $members } = useSWR('/api/v1/entities?isTeamMembers=true');
  const members = $members?.data?.users || [];

 
  return (
    <>
      <div className="flex flex-col items-center justify-center px-10 3xl:px-0">
        <div className="max-w-7xl w-full">
          <div className="w-full mt-5">
            <div className="flex items-center gap-5">
              <div className="hidden lg:block relative">
                <i className="fa fa-users hidden lg:block text-5xl text-primary" />
              </div>
              <div>
                <h1 className="text-lg lg:text-3xl text-transparent bg-clip-text bg-gradient-to-tr from-primary to-secondary font-extrabold">
                  Our Team
                </h1>
                <p className="text-sm lg:text-base text-gray-500">
                  Meet the team behind the project
                </p>
              </div>
            </div>
          </div>
          {members ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
              {members.map?.((entity, index) => (
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
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 mt-10">
              <div className="w-96 h-64 bg-gray-500/20 rounded-md ">
                <div className="flex items-center justify-center h-full">
                  <div className="flex flex-col items-center gap-2">
                    <i className="fa fa-users text-5xl text-primary" />
                    <p className="text-sm lg:text-base  text-gray-500">
                      No team members yet
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
