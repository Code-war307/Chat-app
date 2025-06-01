export function calSkeletonCount(){
    const sidebarHeight = window.innerHeight;
    const skeletonHeight = 64;
    return Math.floor(sidebarHeight / skeletonHeight);
}