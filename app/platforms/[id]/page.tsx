import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, BadgeCheck, Bolt, Users } from 'lucide-react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PlatformLogo from '@/components/ui/platformLogo';
import { prisma } from '@/lib/db';

interface PlatformDetailPageProps {
	params: Promise<{ id: string }>;
}

function getInitials(name: string | null) {
	if (!name) return '?';
	return name
		.split(' ')
		.map((word) => word[0])
		.join('')
		.slice(0, 2)
		.toUpperCase();
}

export default async function PlatformDetailPage({ params }: PlatformDetailPageProps) {
	const { id } = await params;

	const platform = await prisma.platform.findUnique({
		where: { slug: id },
	});

	if (!platform) {
		notFound();
	}

	const groups = await prisma.group.findMany({
		where: { platformId: platform.id },
		include: {
			owner: { select: { id: true, name: true, image: true } },
			_count: { select: { members: { where: { status: 'ACTIVE' } } } },
		},
		orderBy: { createdAt: 'desc' },
	});

	const planFilters = ['Tous', ...new Set(groups.map((g) => g.planLabel))];
	const lowestPrice = groups.length > 0 ? Math.min(...groups.map((g) => g.pricePerMonth)) : 0;

	return (
		<div className="min-h-screen bg-gradient-to-b from-background to-muted/20 px-4 py-10 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-6xl space-y-6">
				<Link
					href="/platforms"
					className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
				>
					<ArrowLeft className="h-4 w-4" />
					Retour aux plateformes
				</Link>

				<div className="rounded-2xl border bg-card/80 p-6 backdrop-blur-sm md:p-8">
					<div className="space-y-4 text-center">
						<div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border bg-background">
							<PlatformLogo
								iconName={platform.logo}
								color={platform.logoColor || 'currentColor'}
								size={48}
								fallbackLabel={platform.name}
							/>
						</div>
						<h1 className="text-4xl font-bold tracking-tight md:text-5xl">{platform.name}</h1>
						<p className="mx-auto max-w-3xl text-base text-muted-foreground md:text-lg">{platform.description}</p>

						<div className="mx-auto grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
							<div className="rounded-xl border bg-background p-3">
								<p className="text-xs text-muted-foreground">Offres disponibles</p>
								<p className="text-2xl font-semibold">{groups.length}</p>
							</div>
							<div className="rounded-xl border bg-background p-3">
								<p className="text-xs text-muted-foreground">Prix à partir de</p>
								<p className="text-2xl font-semibold">
									{groups.length > 0 ? `${lowestPrice.toFixed(2).replace('.', ',')}€` : '-'}
								</p>
							</div>
							<div className="rounded-xl border bg-background p-3">
								<p className="text-xs text-muted-foreground">Groupes actifs</p>
								<p className="text-2xl font-semibold">{groups.length}</p>
							</div>
						</div>
					</div>
				</div>

				<div className="grid gap-6 lg:grid-cols-[320px_1fr]">
					<Card className="h-fit rounded-2xl">
						<CardHeader>
							<CardTitle>Type d&apos;offre {platform.name}</CardTitle>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="flex flex-wrap gap-2">
								{planFilters.map((label, index) => (
									<Badge key={label} variant={index === 0 ? 'default' : 'secondary'}>
										{label}
									</Badge>
								))}
							</div>

							<div className="space-y-3">
								<div className="flex items-start gap-3">
									<BadgeCheck className="mt-0.5 h-4 w-4 text-foreground" />
									<div>
										<p className="text-sm font-medium">Facture vérifiée</p>
										<p className="text-sm text-muted-foreground">
											Le propriétaire a fait vérifier son abonnement en fournissant une facture.
										</p>
									</div>
								</div>
								<div className="flex items-start gap-3">
									<Bolt className="mt-0.5 h-4 w-4 text-foreground" />
									<div>
										<p className="text-sm font-medium">Acceptation instantanée</p>
										<p className="text-sm text-muted-foreground">
											Le propriétaire accepte instantanément les nouveaux co-abonnés.
										</p>
									</div>
								</div>
								<div className="flex items-start gap-3">
									<Users className="mt-0.5 h-4 w-4 text-foreground" />
									<div>
										<p className="text-sm font-medium">Profils actifs</p>
										<p className="text-sm text-muted-foreground">
											Consultez les informations de chaque profil avant de rejoindre un partage.
										</p>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					<div className="space-y-3">
						{groups.length === 0 ? (
							<Card className="rounded-2xl">
								<CardContent className="p-6 text-center text-muted-foreground">
									Aucun groupe disponible pour le moment. Soyez le premier à partager votre abonnement !
								</CardContent>
							</Card>
						) : (
							groups.map((group) => (
								<Card key={group.id} className="rounded-2xl border bg-card/90 transition-shadow hover:shadow-lg">
									<CardContent className="flex flex-col gap-5 p-5 md:flex-row md:items-center md:justify-between md:p-6">
										<div className="flex items-start gap-4">
											<Avatar className="size-12 border">
												<AvatarFallback>{getInitials(group.owner.name)}</AvatarFallback>
											</Avatar>

											<div className="space-y-2">
												<div className="flex items-center gap-2">
													<p className="font-semibold">{group.owner.name || 'Utilisateur'}</p>
												</div>

												<div className="flex items-center gap-2 text-sm text-muted-foreground">
													<div className="flex h-7 w-7 items-center justify-center rounded-md border bg-background">
														<PlatformLogo
															iconName={platform.logo}
															color={platform.logoColor || 'currentColor'}
															size={16}
															fallbackLabel={platform.name}
														/>
													</div>
													<span>{group.planLabel}</span>
												</div>

												<div className="flex flex-wrap gap-2">
													{group.invoiceVerified && <Badge variant="secondary">Facture vérifiée</Badge>}
													{group.instantAcceptance && <Badge variant="secondary">Acceptation instantanée</Badge>}
													<Badge variant="outline">
														<Users className="mr-1 h-3 w-3" />
														{group._count.members}/{group.maxMembers}
													</Badge>
												</div>
											</div>
										</div>

										<div className="flex items-center gap-4 md:gap-6">
											<div className="text-right">
												<p className="text-3xl font-bold">{group.pricePerMonth.toFixed(2).replace('.', ',')}€</p>
												<p className="text-sm text-muted-foreground">/ mois</p>
											</div>
											<Button asChild>
												<Link href={`/groups/${group.id}`}>Voir le groupe</Link>
											</Button>
										</div>
									</CardContent>
								</Card>
							))
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
