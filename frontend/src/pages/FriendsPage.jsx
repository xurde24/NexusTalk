import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { UsersIcon } from "lucide-react";
import { getUserFriends } from "../lib/api";
import FriendCard from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";

const FriendsPage = () => {
  const { 
    data: friends = [], 
    isLoading: loadingFriends,
    error 
  } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  if (error) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="alert alert-error">
          Error loading friends: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">My Friends</h2>
            <p className="opacity-70 mt-1">
              {friends.length} {friends.length === 1 ? "friend" : "friends"}
            </p>
          </div>
          <Link to="/notifications" className="btn btn-outline btn-sm">
            <UsersIcon className="mr-2 size-4" />
            Friend Requests
          </Link>
        </div>

        {loadingFriends ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : friends.length === 0 ? (
          <NoFriendsFound />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {friends.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendsPage;

