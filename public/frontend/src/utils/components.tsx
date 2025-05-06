import  DashboardIcon from "../icons/dashboard.svg"
import BookIcon from "../icons/book.svg"
import FileIcon from "../icons/file.svg"
import MasterIcon from "../icons/database.svg"
import NewsIcon from "../icons/news.svg"
import UserConfigIcon from "../icons/cog.svg"


const menuGroups = {

            dashboard: {
                icon: <DashboardIcon className="size-6 shrink-0 stroke-[1.5] stroke-white" />,
                allowed_roles: [],
                label: "Dashboard",
                route: "/",
            },
            guestBook: {
                icon: <BookIcon className="size-6 shrink-0 stroke-[1.5] stroke-white"/> ,
                label: "Buku Tamu",
                allowed_roles: ["superadmin", "resepsionis", "administrasi"],
                route: "#",
                children: [
                    { label: "Registrasi Tamu", route: "/guestBook" },
                    { label: "List Tamu", route: "/guestBook/list" },
                ],
            },
            sppd: {
                icon: <FileIcon className="size-6 shrink-0 stroke-[1.5] stroke-white"/>,
                label: "SPPD",
                allowed_roles: ["superadmin", "administrasi", "karyawan", "kepala_sekolah", "admin_sekolah", "staf"],
                route: "#",
                children: [
                    { label: "Pengajuan Sppd", route: "/sppd" },
                    { label: "Daftar Sppd", route: "/sppd/list" },
                ],
            },
            service: {
                icon: <BookIcon className="size-6 shrink-0 stroke-[1.5] stroke-white"/>,
                label: "Layanan",
                allowed_roles: ["superadmin", "guru", "adminsekolah"],
                route: "#",
                children: [
                    { label: "Revisi Ijazah", route: "/certificates/list" },
                    { label: "Surat Pindah Siswa", route: "/studentTransfer/list" },
                    { label: "Penggantian Bendahara", route: "/recomendation/list" },
                ],
            },
          
            master: {
                icon: <MasterIcon className="size-6 shrink-0 stroke-[1.5] stroke-white"/> ,
                label: "Master",
                allowed_roles: ["superadmin"],
                route: "#",
                children: [
                    { label: "Data Divisi", route: "/division" },
                    { label: "Data Instansi", route: "/institution" },
                    { label: "Data Transportasi", route: "/transport" },
                    { label: "Data Biaya", route: "/budget" },
                    { label: "Data Mitra", route: "/partners" },
                ],
            },
            
            news: {
                icon:  <NewsIcon className="size-6 shrink-0 stroke-[1.5] stroke-white"/> ,
                label: "Berita",
                allowed_roles: ["superadmin", "staf", "kabid", "kadis", "administrasi"],
                route: "#",
                children: [
                    { label: "List Berita", route: "/news" },
                    { label: "Tambah Berita", route: "/news/addData" },
                ],
            },
            user_config: {
                icon:  <UserConfigIcon className="size-6 shrink-0 stroke-[1.5] stroke-white"/>,
                label: "Pengaturan Pengguna",
                allowed_roles: ["superadmin"],
                route: "#",
                children: [
                    { label: "List Karyawan", route: "/users/list" },
                    { label: "Hak Akses", route: "/permissions" },
                    { label: "List Tugas", route: "/roles" },
                ],
            },
    
};


export function getSidebar(roles: string[]) {

    if (!roles || roles.length == 0) return []

    const registered_sidebar: string[] = []

    const menu_keys = Object.values(menuGroups)

    const sidebar = [
        {
            name: "",
            menuItems: roles.map((role: string) => {
                return menu_keys.filter(menu => {

                    const allowedRoles = menu.allowed_roles as string[];

                    if (allowedRoles.length == 0) return true
                    
                    if (!registered_sidebar.includes(menu.label) && allowedRoles.includes(role)) {
                        registered_sidebar.push(menu.label)
                        return true
                    }

                    return false
                })
            })[0]
        }
    ]


    return sidebar

}