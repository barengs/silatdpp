"use client";

import Breadcrumb from "@/components/Breadcrumb";
import { Editor } from "@tinymce/tinymce-react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import useFetch from "@/hooks/useFetch";
import { useUpdateNewsMutation } from "@/services/news";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useStore } from "react-redux";
import { toast } from "react-toastify";
import { z } from "zod";

const Page: React.FC = () => {
    const store = useStore();
    const authState = store.getState().auth;

    const editorRef = useRef()

    const [file, setFile] = useState<File[]>([]);

    const schema = z.object({
        judul: z.string().min(1, "Judul tidak boleh kosong!"),
        isi: z.string().min(1, "Isi tidak boleh kosong!"),
        gambar: z.instanceof(File),
    });

    const handlePostData = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = event.currentTarget;

        const data = new FormData(formData);

        const validation_res = schema.safeParse({
            judul: data.get("judul"),
            isi: data.get("isi"),
            gambar: file,
        });

        if (!validation_res.success) {
            toast.error("Data tidak valid", { position: "top-right" });
            setErrors(validation_res.error?.flatten().fieldErrors);
            return;
        }

        data.append("gambar", file);

        const res = await fetchCaller("berita", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${authState.token}`,
            },
            body: data,
        });

        if (!res.ok) {
            toast.error("Galat saat menambahkan data", {
                position: "top-right",
            });

            console.log(res);

            return;
        }

        toast.success("Data Berita berhasil ditambahkan!", {
            position: "top-right",
        });

        setTimeout(() => window.location.reload(), 2000);
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Tambah Berita" />
            <form
                onSubmit={handlePostData}
                className="gap-9 rounded-sm border border-stroke bg-white px-6.5 py-4 shadow-default dark:border-strokedark dark:bg-boxdark"
            >
                <Editor
                    ref={editorRef}
                    apiKey="y68r3jg8eztocsl3akqljuyp3tdqipz0dyskjwz4tzyyoabl"
                    init={{
                        plugins: [
                            // Core editing features
                            "anchor",
                            "autolink",
                            "charmap",
                            "codesample",
                            "emoticons",
                            "image",
                            "link",
                            "lists",
                            "media",
                            "searchreplace",
                            "table",
                            "visualblocks",
                            "wordcount",
                            "checklist",
                            "mediaembed",
                            "casechange",
                            "formatpainter",
                            "pageembed",
                            "a11ychecker",
                            "tinymcespellchecker",
                            "permanentpen",
                            "powerpaste",
                            "advtable",
                            "advcode",
                            "editimage",
                            "advtemplate",
                            "mentions",
                            "tinycomments",
                            "tableofcontents",
                            "footnotes",
                            "mergetags",
                            "autocorrect",
                            "typography",
                            "inlinecss",
                        ],
                        toolbar:
                            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                        tinycomments_mode: "embedded",
                        tinycomments_author: "Author name",
                        menubar: false,
                        mergetags_list: [
                            { value: "First.Name", title: "First Name" },
                            { value: "Email", title: "Email" },
                        ],
                    }}
                />
            </form>
        </DefaultLayout>
    );
};

export default Page;
