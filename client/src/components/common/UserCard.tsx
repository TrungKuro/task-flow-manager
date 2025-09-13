import Image from "next/image";
import React from "react";

import { User } from "@/redux/slice/api";

/* ------------------------------------------------------------------------- */
/*                               MAIN COMPONENT                              */
/* ------------------------------------------------------------------------- */

type UserCardProps = {
  user: User;
};

/* ------------------------------------------------------------------------- */

const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className="flex items-center gap-4 rounded p-4 shadow dark:bg-dark-secondary dark:text-white">
      {/* Avatar User (if have) */}
      {user.profilePictureUrl && (
        <div className="relative h-10 w-10">
          <Image
            src={`${process.env.NEXT_PUBLIC_TFM_S3_IMAGES_URL}/${user.profilePictureUrl}`}
            alt="profile picture"
            fill
            className="rounded-full object-cover"
          />
        </div>
      )}

      {/* Content of User */}
      <div>
        <p className="font-semibold">{user.username}</p>
        <p className="font-light italic">{user.email}</p>
      </div>
    </div>
  );
};

export default UserCard;
