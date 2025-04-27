import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ConfirmationDialogProps {
  triggerText: string;
  title: string;
  description: string;
  onConfirm: () => void;
}

const ConfirmationDialog = ({
  triggerText,
  title,
  description,
  onConfirm,
}: ConfirmationDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setIsDialogOpen(false); // Menutup dialog setelah konfirmasi
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="link" size="sm" className="text-red-500 underline">
          {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
