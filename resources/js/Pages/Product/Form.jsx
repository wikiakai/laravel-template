import React, { useRef, useState, useEffect } from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import FormInput from "@/Components/FormInput";
import FormInputNumeric from "@/Components/FormInputNumeric";
import FormFile from "@/Components/FormFile";
import TextArea from "@/Components/TextArea";
import SelectInput from "@/Components/SelectInput";

import Button from "@/Components/Button";
import { isEmpty } from "lodash";

import { router } from "@inertiajs/react";

function Form(props) {
    const {
        props: { errors },
    } = usePage();
    const { item, formType, categories } = props;
    const inputRef = useRef();
    const [processing, setProcessing] = useState(false);

    const [formValue, setFormValue] = useState({
        name: null,
        qty: null,
        price: null,
        cost: null,
        category_id: null,
        description: null,
        status: null,
        image: null,
        image_url: "",
    });
    const [formDisabled, setFormDisabled] = useState(false);

    const handleChangeField = (e, field) => {
        let updatedFormValue = formValue;

        // const fieldName = field === undefined ? e.target.name : field;
        const value = field === "image" ? e.target.files[0] : e.target.value;

        updatedFormValue[field] = value;

        setFormValue({ ...updatedFormValue });
    };

    const handleSubmit = () => {
        console.log(item);
        if (isEmpty(item) === false) {
            const url = route("product.update", item); // product/id
            router.post(url, formValue, {
                onStart: () => setProcessing(true),
                onFinish: (e) => {
                    setProcessing(false);
                },
            });
            return;
        }
        // handle submit new data
        router.post(route("product.store"), formValue, {
            forceFormData: true,
            onStart: () => setProcessing(true),
            onFinish: (e) => {
                setProcessing(false);
            },
        });
    };

    useEffect(() => {
        if (formType === "show") {
            setFormValue({
                name: item.name,
                qty: item.qty,
                price: item.price,
                cost: item.cost,
                category_id: item.category_id,
                description: item.description,
                status: item.status,
                image: item.image,
                image_url: "",
            });
            setFormDisabled(true);
        } else if (formType === "create") {
            setFormDisabled(false);
        } else if (formType === "edit") {
            setFormDisabled(false);
            setFormValue({
                name: item.name,
                qty: item.qty,
                price: item.price,
                cost: item.cost,
                category_id: item.category_id,
                description: item.description,
                status: item.status,
                image: item.image,
                image_url: "",
            });
        }
    }, []);

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            flash={props.flash}
            page={"System"}
            action={"Product"}
        >
            <Head title="Product" />
            <div>
                <div className="mx-auto sm:px-6 lg:px-8 ">
                    <div className="p-6 shadow-sm sm:rounded-lg bg-white dark:bg-gray-800 space-y-4">
                        <FormInput
                            name="name"
                            value={formValue.name}
                            onChange={(e) => handleChangeField(e, "name")}
                            label="Nama"
                            error={errors.name}
                            disabled={formDisabled}
                        />
                        <FormInputNumeric
                            name="qty"
                            value={formValue.qty}
                            onChange={(e) => handleChangeField(e, "qty")}
                            label="Quantity"
                            error={errors.qty}
                            disabled={formDisabled}
                        />
                        <FormInputNumeric
                            name="price"
                            value={formValue.price}
                            onChange={(e) => handleChangeField(e, "price")}
                            label="Price"
                            error={errors.price}
                            disabled={formDisabled}
                        />
                        <FormInputNumeric
                            name="cost"
                            value={formValue.cost}
                            onChange={(e) => handleChangeField(e, "cost")}
                            label="Cost"
                            error={errors.cost}
                            disabled={formDisabled}
                        />
                        <SelectInput
                            name="category"
                            value={formValue.category_id}
                            label="Category"
                            error={errors.category_id}
                            disabled={formDisabled}
                            onChange={(e) =>
                                handleChangeField(e, "category_id")
                            }
                        >
                            <option value="">Select</option>
                            {categories?.map((cat) => (
                                <option value={cat.id}>{cat.name}</option>
                            ))}
                        </SelectInput>
                        <SelectInput
                            name="status"
                            value={formValue.status}
                            label="Status"
                            error={errors.status}
                            disabled={formDisabled}
                            onChange={(e) => handleChangeField(e, "status")}
                        >
                            <option value="">Select</option>
                            <option value="ready">Ready</option>
                            <option value="out_of_stock">Out of Stock</option>
                            <option value="on_ordered">On Ordered</option>
                        </SelectInput>
                        <TextArea
                            name="description"
                            value={formValue.description}
                            onChange={(e) =>
                                handleChangeField(e, "description")
                            }
                            label="Description"
                            error={errors.description}
                            disabled={formDisabled}
                        />
                        {formType === "edit" || formType === "show"
                            ? formValue.image && (
                                  <img
                                      src={`/storage/${formValue.image}`}
                                      className="mb-1 max-h-64 w-full object-contain"
                                      alt="preview"
                                  />
                              )
                            : null}
                        <FormFile
                            label="Gambar"
                            inputRef={inputRef}
                            onChange={(e) => handleChangeField(e, "image")}
                            error={errors.img}
                        />
                        <div className="flex items-center">
                            {formDisabled ? (
                                <Button
                                    type="secondary"
                                    onClick={() => setFormDisabled(false)}
                                >
                                    Edit
                                </Button>
                            ) : (
                                <Button
                                    onClick={handleSubmit}
                                    processing={processing}
                                >
                                    Simpan
                                </Button>
                            )}

                            <Link href={route("product.index")}>
                                <Button type="secondary">Kembali</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Form;
