import * as Haptics from "expo-haptics";
import { router, usePathname } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";
import * as Icon from "react-native-heroicons/outline";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

interface TabBarProps {
  otherStyles?: string;
}

interface Route {
  name: string;
  path: any;
  icon: (isActive: boolean) => any;
}

const TabBar = ({ otherStyles }: TabBarProps) => {
  const pathname = usePathname();

  // Define routes with their respective paths and icons
  const routes: Route[] = [
    {
      name: "Home",
      path: "/",
      icon: (isActive: boolean) => (
        <Pressable

          onPress={() => handleNavigation("/")}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <View
            className={`rounded-full aspect-square flex justify-center items-center`}
          >
            <Icon.HomeIcon
              color={isActive ? "#F8FAED" : "#8E8F88"}
              size={24}
              strokeWidth={3}
            />
          </View>
        </Pressable>
      ),
    },
    {
      name: "Create",
      path: "/habits/add",
      icon: (isActive: boolean) => (
        <Pressable

          onPress={() => handleNavigation("/habits/add")}
          hitSlop={{ top: 20, bottom: 20, left: 0, right: 20 }}
        >
          <View
            className={`rounded-full aspect-square flex justify-center items-center`}
          >
            <Icon.PlusIcon
              color={isActive ? "#FFFFFF" : "#8E8F88"}
              size={24}
              strokeWidth={3}
            />
          </View>
        </Pressable>
      ),
    },
  ];
  const effectivePath =
    pathname === "/settings" || pathname.includes("/habits/edit")
      ? "/"
      : pathname;

  //create ishidden toggle
  const [isHidden, setIsHidden] = React.useState(false);
  // Shared value to track the position of the animated background
  const translateX = useSharedValue(0);

  // Update the translateX value based on the active route
  React.useEffect(() => {
    const activeIndex = routes.findIndex(
      (route) => route.path === effectivePath
    );

    translateX.value = withTiming(activeIndex * 62, { duration: 150 });

    if (pathname === "/habits/add" || pathname === "/") {
      setIsHidden(false);
    } else if (pathname === "/settings") {
      setIsHidden(true);
    }

    console.log(pathname);
  }, [pathname]); // Use the effectivePath here

  // Animated style for the background
  const animatedBackgroundStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const handleNavigation = (path: any) => {
    Haptics.selectionAsync();
    // If current path is create and trying to go to home, go back
    if (pathname === "/habits/add" && path === "/") {
      router.back();
    }
    // If current path is not create, navigate normally
    else if (pathname !== path) {
      router.push(path);
    }
  };

  return (
    <SafeAreaView
      edges={["bottom"]}
      className={`flex-row justify-center items-center absolute bottom-0 left-0 right-0 ${
        isHidden ? "-z-10" : ""
      }`}
    >
      <View className="flex-row justify-center items-center mb-3">
        <View
          className={`flex-row px-9 gap-14 h-20 rounded-full justify-center items-center bg-text relative ${otherStyles}`}
        >
          {/* Animated background that moves between tabs */}
          <Animated.View
            style={animatedBackgroundStyle}
            className="absolute w-[4.8rem] h-[4.3rem] bg-primary rounded-full left-[7%]"
          />

          {routes.map((route) => {
            const isActive = effectivePath === route.path;

            return (
              <View
                key={route.path}
                className="flex-1 p-2 items-center justify-center z-10"
              >
                {route.icon(isActive)}
              </View>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TabBar;
