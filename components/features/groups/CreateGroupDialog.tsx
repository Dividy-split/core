"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"

interface Platform {
  id: string
  slug: string
  name: string
  category: string
}

export function CreateGroupDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [platforms, setPlatforms] = useState<Platform[]>([])

  const [platformId, setPlatformId] = useState("")
  const [pricePerMonth, setPricePerMonth] = useState("")
  const [maxMembers, setMaxMembers] = useState("")
  const [instantAcceptance, setInstantAcceptance] = useState(false)

  useEffect(() => {
    if (open && platforms.length === 0) {
      fetch("/api/platforms")
        .then((res) => res.json())
        .then(setPlatforms)
        .catch(() => toast.error("Impossible de charger les plateformes"))
    }
  }, [open, platforms.length])

  function resetForm() {
    setPlatformId("")
    setPricePerMonth("")
    setMaxMembers("")
    setInstantAcceptance(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      const selectedPlatform = platforms.find((p) => p.id === platformId)
      const res = await fetch("/api/groups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platformId,
          planLabel: `Partage ${selectedPlatform?.name || ""}`,
          pricePerMonth,
          maxMembers,
          invoiceVerified: false,
          instantAcceptance,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Erreur lors de la création")
      }

      toast.success("Groupe créé avec succès !")
      resetForm()
      setOpen(false)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur inconnue")
    } finally {
      setLoading(false)
    }
  }

  const categoryLabels: Record<string, string> = {
    streaming: "Streaming Vidéo",
    music: "Musique",
    gaming: "Gaming",
    fitness: "Fitness",
    cloud: "Cloud & Stockage",
    elearning: "E-Learning",
  }

  const grouped = platforms.reduce<Record<string, Platform[]>>((acc, p) => {
    const cat = p.category
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(p)
    return acc
  }, {})

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Créer un groupe</DialogTitle>
          <DialogDescription>
            Partagez votre abonnement avec d&apos;autres membres
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="platform">Plateforme</Label>
            <Select value={platformId} onValueChange={setPlatformId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choisir une plateforme" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(grouped).map(([cat, items]) => (
                  <div key={cat}>
                    <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                      {categoryLabels[cat] || cat}
                    </div>
                    {items.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.name}
                      </SelectItem>
                    ))}
                  </div>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Prix / mois (par personne)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="5.99"
                value={pricePerMonth}
                onChange={(e) => setPricePerMonth(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxMembers">Places disponibles</Label>
              <Input
                id="maxMembers"
                type="number"
                min="1"
                max="20"
                placeholder="4"
                value={maxMembers}
                onChange={(e) => setMaxMembers(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="instantAcceptance">Acceptation instantanée</Label>
            <Switch
              id="instantAcceptance"
              checked={instantAcceptance}
              onCheckedChange={setInstantAcceptance}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Annuler
            </Button>
            <Button type="submit" disabled={loading || !platformId}>
              {loading ? "Création..." : "Créer le groupe"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
