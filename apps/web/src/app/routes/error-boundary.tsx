import { isRouteErrorResponse, Link, useRouteError } from 'react-router';
import Logo from '@/assets/logo.svg?react'; // Importation du composant Logo
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@todoapp/ui/components/card'; // Importation des composants Card

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <div className="flex min-h-svh flex-col">
      <nav className="bg-muted flex items-center justify-between border-b px-6 py-2">
        <Link to="/" className="flex items-center gap-2 font-medium">
          <Logo className="h-9" />
        </Link>
      </nav>
      <main className="flex-1 p-2 md:p-4 flex justify-center">
        <Card className="w-full">
          {isRouteErrorResponse(error) ? (
            <>
              <CardHeader className="text-center">
                <CardTitle className="text-xl md:text-2xl">
                  {error.status} {error.statusText}
                </CardTitle>
                <CardDescription className="mt-2 text-base md:text-lg">
                  {error.data || 'Une erreur inattendue est survenue.'}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4 text-center">
                <p className="text-sm text-muted-foreground">Veuillez réessayer ou contacter l'administrateur si le problème persiste.</p>
              </CardContent>
            </>
          ) : error instanceof Error ? (
            <>
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl">Une erreur est survenue</CardTitle>
                <CardDescription className="mt-2 text-base md:text-lg">
                  {error.message}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground mb-2">La trace de la pile est :</p>
                <pre className="bg-muted p-2 rounded-md text-sm">
                  {error.stack}
                </pre>
              </CardContent>
            </>
          ) : (
            <>
              <CardHeader className="text-center">
                <CardTitle className="text-xl md:text-2xl">Erreur Inconnue</CardTitle>
                <CardDescription className="mt-2 text-base md:text-lg">
                  Une erreur inattendue et non identifiée est survenue.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4 text-center">
                <p className="text-sm text-muted-foreground">Veuillez réessayer ou contacter l'administrateur si le problème persiste.</p>
              </CardContent>
            </>
          )}
        </Card>
      </main>
    </div>
  );
}
