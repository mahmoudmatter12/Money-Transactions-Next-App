import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export default async function checkUser() {
  const user = await currentUser();

  // First check if authenticated or not 
  if (!user) {
    return null;
  }

  // Then check if user exists in database by ClerkId
  const dbUser = await db.user.findUnique({
    where: {
      ClerkId: user.id,
    },
  });

  // If user exists in database then return user
  if (dbUser) {
    return dbUser;
  }

  // Check if user exists by email as well
  const dbUserByEmail = await db.user.findUnique({
    where: {
      email: user.emailAddresses[0].emailAddress,
    },
  });

  // If user exists by email, update ClerkId and return user
  if (dbUserByEmail) {
    const updatedUser = await db.user.update({
      where: {
        email: user.emailAddresses[0].emailAddress,
      },
      data: {
        ClerkId: user.id,
        name: user.fullName,
        imgUrl: user.imageUrl,
      },
    });
    return updatedUser;
  }

  // Else add the user to the database and return user
  try {
    const newUser = await db.user.create({
      data: {
        ClerkId: user.id,
        name: user.fullName,
        imgUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
      },
    });

    return newUser;
  } catch (error: any) {
    if (error.code === 'P2002') {
      // Handle unique constraint violations
      if (error.meta?.target?.includes('ClerkId')) {
        // User already exists with this ClerkId, fetch the existing user
        const existingUser = await db.user.findUnique({
          where: {
            ClerkId: user.id,
          },
        });
        return existingUser;
      } else if (error.meta?.target?.includes('email')) {
        // User already exists with this email, fetch and update the existing user
        const existingUser = await db.user.findUnique({
          where: {
            email: user.emailAddresses[0].emailAddress,
          },
        });
        
        if (existingUser) {
          // Update the existing user with new ClerkId
          const updatedUser = await db.user.update({
            where: {
              email: user.emailAddresses[0].emailAddress,
            },
            data: {
              ClerkId: user.id,
              name: user.fullName,
              imgUrl: user.imageUrl,
            },
          });
          return updatedUser;
        }
        
        return existingUser;
      }
    }
    throw error;
  }
}