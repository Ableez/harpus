"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Music, Upload, X, CheckCircle, Play, Pause } from "lucide-react";
import WaveformDisplay from "./WaveformDisplay";

interface FileWithPreview extends File {
  preview: string;
  title: string;
  startTime: number;
  endTime: number;
}

export default function MusicUploader() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(
    null,
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          title: file.name,
          startTime: 0,
          endTime: 30, // Default preview length of 30 seconds
        }),
      ),
    );
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "audio/*": [".mp3", ".wav", ".aiff", ".flac"],
    },
  });

  const removeFile = (file: FileWithPreview) => {
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(file), 1);
    setFiles(newFiles);
  };

  const updateFileMetadata = (
    index: number,
    key: string,
    value: string | number,
  ) => {
    const newFiles = [...files];
    newFiles[index] = { ...newFiles[index], [key]: value };
    setFiles(newFiles);
  };

  const uploadFiles = async () => {
    setUploading(true);
    // Simulating upload process
    for (let i = 0; i <= 100; i++) {
      setUploadProgress(i);
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    setUploading(false);
    setUploadProgress(0);
  };

  const togglePlayPause = (file: FileWithPreview) => {
    if (currentAudio && currentAudio.src === file.preview) {
      if (isPlaying) {
        currentAudio.pause();
        setIsPlaying(false);
      } else {
        currentAudio.play();
        setIsPlaying(true);
      }
    } else {
      if (currentAudio) {
        currentAudio.pause();
      }
      const audio = new Audio(file.preview);
      audio.currentTime = file.startTime;
      audio.play();
      setCurrentAudio(audio);
      setIsPlaying(true);

      audio.addEventListener("timeupdate", () => {
        if (audio.currentTime >= file.endTime) {
          audio.pause();
          audio.currentTime = file.startTime;
          setIsPlaying(false);
        }
      });
    }
  };

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  return (
    <div className="mx-auto w-full max-w-4xl p-4">
      <Card className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
        <CardContent className="p-6">
          <div
            {...getRootProps()}
            className={`cursor-pointer rounded-lg border-2 border-dashed border-white/50 p-8 text-center transition-all ${
              isDragActive ? "bg-white/10" : "hover:bg-white/5"
            }`}
          >
            <input {...getInputProps()} />
            <Music className="mx-auto mb-4 h-12 w-12" />
            <p className="text-lg font-semibold">
              Drag 'n' drop your sound files here
            </p>
            <p className="text-sm opacity-75">or click to select files</p>
          </div>

          {files.length > 0 && (
            <div className="mt-6 space-y-6">
              {files.map((file, index) => (
                <div key={file.name} className="rounded-lg bg-white/10 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Music className="h-6 w-6" />
                      <span className="text-sm font-medium">{file.name}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(file)}
                      className="hover:bg-white/20"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor={`title-${index}`}>Title</Label>
                      <Input
                        id={`title-${index}`}
                        value={file.title}
                        onChange={(e) =>
                          updateFileMetadata(index, "title", e.target.value)
                        }
                        className="border-white/30 bg-white/20 text-white placeholder-white/50"
                      />
                    </div>

                    <div>
                      <Label>Preview Range (seconds)</Label>
                      <div className="flex items-center space-x-4">
                        <Input
                          type="number"
                          value={file.startTime}
                          onChange={(e) =>
                            updateFileMetadata(
                              index,
                              "startTime",
                              parseFloat(e.target.value),
                            )
                          }
                          className="w-20 border-white/30 bg-white/20 text-white"
                        />
                        <Slider
                          min={0}
                          max={30}
                          step={1}
                          value={[file.startTime, file.endTime]}
                          onValueChange={(value) => {
                            updateFileMetadata(index, "startTime", value[0]);
                            updateFileMetadata(index, "endTime", value[1]);
                          }}
                          className="flex-1"
                        />
                        <Input
                          type="number"
                          value={file.endTime}
                          onChange={(e) =>
                            updateFileMetadata(
                              index,
                              "endTime",
                              parseFloat(e.target.value),
                            )
                          }
                          className="w-20 border-white/30 bg-white/20 text-white"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => togglePlayPause(file)}
                      >
                        {isPlaying && currentAudio?.src === file.preview ? (
                          <Pause className="mr-2 h-4 w-4" />
                        ) : (
                          <Play className="mr-2 h-4 w-4" />
                        )}
                        {isPlaying && currentAudio?.src === file.preview
                          ? "Pause"
                          : "Play"}{" "}
                        Preview
                      </Button>
                    </div>

                    <WaveformDisplay audioUrl={file.preview} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {files.length > 0 && (
            <div className="mt-6">
              <Button
                onClick={uploadFiles}
                disabled={uploading}
                className="w-full bg-white text-purple-600 hover:bg-white/90"
              >
                {uploading ? (
                  <span className="flex items-center">
                    Uploading...{" "}
                    <Upload className="ml-2 h-4 w-4 animate-bounce" />
                  </span>
                ) : (
                  <span className="flex items-center">
                    Upload Files <Upload className="ml-2 h-4 w-4" />
                  </span>
                )}
              </Button>
            </div>
          )}

          {uploading && (
            <div className="mt-4">
              <Progress value={uploadProgress} className="h-2 bg-white/20" />
              {uploadProgress === 100 && (
                <div className="mt-2 flex items-center justify-center text-green-300">
                  <CheckCircle className="mr-2 h-5 w-5" />
                  <span>Upload Complete!</span>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
