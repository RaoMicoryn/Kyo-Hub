"use client";
import { useEffect, useState } from "react";
import { Modal, Form, Input, InputNumber, Select } from "antd";

const thisYear = new Date().getFullYear();

export default function MovieForm({ open, movie, genres, onSubmit, onClose }) {
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);
  const [imgOk, setImgOk] = useState(true);
  const image = Form.useWatch("image", form);

  useEffect(() => {
    if (!open) return;
    form.resetFields();
    if (movie) form.setFieldsValue(movie);
  }, [open, movie, form]);

  useEffect(() => setImgOk(true), [image]);

  const finish = async (values) => {
    setSaving(true);
    const ok = await onSubmit(values);
    setSaving(false);
    if (ok) form.resetFields();
  };

  return (
    <Modal
      open={open}
      title={movie ? "Edit movie" : "Add movie"}
      okText={movie ? "Save changes" : "Add movie"}
      confirmLoading={saving}
      onOk={() => form.submit()}
      onCancel={onClose}
      forceRender
      centered
      width={560}
    >
      <Form form={form} layout="vertical" onFinish={finish} requiredMark={false} className="mt-4">
        <Form.Item name="title" label="Title" rules={[{ required: true, whitespace: true, message: "Enter the movie title" }]}>
          <Input placeholder="Inception" />
        </Form.Item>
        <Form.Item name="director" label="Director" rules={[{ required: true, whitespace: true, message: "Enter the director's name" }]}>
          <Input placeholder="Christopher Nolan" />
        </Form.Item>
        <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-3">
          <Form.Item name="genre" label="Genres" rules={[{ required: true, message: "Choose at least one genre" }]}>
            <Select mode="multiple" showSearch placeholder="Select genres" options={genres.map((g) => ({ value: g, label: g }))} />
          </Form.Item>
          <Form.Item name="year" label="Release year" rules={[{ required: true, message: "Enter the release year" }, { type: "number", min: 1888, max: thisYear + 5, message: `Use a year between 1888 and ${thisYear + 5}` }]}>
            <InputNumber className="!w-full" placeholder="2010" controls={false} />
          </Form.Item>
          <Form.Item name="rating" label="Rating (0-10)" rules={[{ required: true, message: "Enter a rating" }, { type: "number", min: 0, max: 10, message: "Rating must be between 0 and 10" }]}>
            <InputNumber className="!w-full" step={0.1} placeholder="8.8" />
          </Form.Item>
        </div>
        <Form.Item name="description" label="Description" rules={[{ required: true, message: "Enter a description" }, { min: 10, message: "Use at least 10 characters" }]}>
          <Input.TextArea rows={3} placeholder="What is the movie about?" />
        </Form.Item>
        <Form.Item name="image" label="Image URL" rules={[{ required: true, message: "Enter an image URL" }, { type: "url", message: "Enter a valid URL starting with http:// or https://" }]}>
          <Input placeholder="https://..." />
        </Form.Item>
        {image && (
          <div className="mb-2 flex items-center gap-3">
            {imgOk ? (
              <img src={image} alt="Poster preview" onError={() => setImgOk(false)} className="h-28 w-[75px] rounded-md bg-neutral-800 object-cover" />
            ) : (
              <span className="text-sm text-red-400">This image can't be loaded. Check the URL.</span>
            )}
          </div>
        )}
      </Form>
    </Modal>
  );
}
