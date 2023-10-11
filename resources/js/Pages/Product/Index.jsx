import React, { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
import { usePrevious } from "react-use";
import { Head, Link } from "@inertiajs/react";
import { Button, Dropdown } from "flowbite-react";
import { HiPencil, HiTrash } from "react-icons/hi";
import { useModalState } from "@/hooks";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Pagination from "@/Components/Pagination";
import ModalConfirm from "@/Components/ModalConfirm";
import SearchInput from "@/Components/SearchInput";
import HasPermission from "@/Components/HasPermission";

function Index(props) {
    const {
        data: { links, data },
    } = props;

    const [search, setSearch] = useState("");

    const confirmModal = useModalState();

    const handleDeleteClick = (itemToDelete) => {
        confirmModal.setData(itemToDelete);
        confirmModal.toggle();
    };

    const onDelete = () => {
        if (confirmModal.data !== null) {
            router.delete(route("product.destroy", confirmModal.data.id));
        }
    };

    return (
        <AuthenticatedLayout
            auth={props.auth}
            flash={props.flash}
            page={"System"}
            action={"Product"}
        >
            <Head title="Product" />
            <div>
                <div className="mx-auto sm:px-6 lg:px-8 ">
                    <div className="p-6 overflow-hidden shadow-sm sm:rounded-lg bg-gray-200 dark:bg-gray-800 space-y-4">
                        <div className="flex justify-between">
                            <HasPermission p="create-role">
                                <Link href={route("product.create")}>
                                    <Button size="sm">Tambah</Button>
                                </Link>
                            </HasPermission>

                            <div className="flex items-center">
                                <SearchInput
                                    onChange={(e) => setSearch(e.target.value)}
                                    value={search}
                                />
                            </div>
                        </div>
                        <div className="overflow-auto">
                            <div>
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mb-4">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="py-3 px-6"
                                            >
                                                Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6"
                                            >
                                                Qty
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6"
                                            >
                                                Price
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6"
                                            />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((product) => (
                                            <tr
                                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                                key={product.id}
                                            >
                                                <td
                                                    scope="row"
                                                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                >
                                                    {product.name}
                                                </td>
                                                <td
                                                    scope="row"
                                                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                >
                                                    {product.qty}
                                                </td>
                                                <td
                                                    scope="row"
                                                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                >
                                                    {product.price}
                                                </td>
                                                <td className="py-4 px-6 flex justify-end">
                                                    <Dropdown
                                                        label={"Opsi"}
                                                        arrowIcon={true}
                                                        dismissOnClick={true}
                                                        size={"sm"}
                                                    >
                                                        <HasPermission p="update-role">
                                                            <Dropdown.Item
                                                                onClick={() =>
                                                                    router.visit(
                                                                        route(
                                                                            "product.show",
                                                                            product.id
                                                                        )
                                                                    )
                                                                }
                                                            >
                                                                <div className="flex space-x-1 items-center">
                                                                    <HiPencil />
                                                                    <div>
                                                                        Detail
                                                                    </div>
                                                                </div>
                                                            </Dropdown.Item>
                                                        </HasPermission>
                                                        <HasPermission p="update-role">
                                                            <Dropdown.Item
                                                                onClick={() =>
                                                                    router.visit(
                                                                        route(
                                                                            "product.edit",
                                                                            product.id
                                                                        )
                                                                    )
                                                                }
                                                            >
                                                                <div className="flex space-x-1 items-center">
                                                                    <HiPencil />
                                                                    <div>
                                                                        Ubah
                                                                    </div>
                                                                </div>
                                                            </Dropdown.Item>
                                                        </HasPermission>
                                                        <HasPermission p="delete-role">
                                                            <Dropdown.Item
                                                                onClick={() =>
                                                                    handleDeleteClick(
                                                                        product
                                                                    )
                                                                }
                                                            >
                                                                <div className="flex space-x-1 items-center">
                                                                    <HiTrash />
                                                                    <div>
                                                                        Hapus
                                                                    </div>
                                                                </div>
                                                            </Dropdown.Item>
                                                        </HasPermission>
                                                    </Dropdown>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {/* <div className="w-full flex items-center justify-center">
                                <Pagination links={links} params={params} />
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
            <ModalConfirm modalState={confirmModal} onConfirm={onDelete} />
        </AuthenticatedLayout>
    );
}

export default Index;
