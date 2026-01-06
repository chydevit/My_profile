'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Printer } from 'lucide-react';

export default function ResumePrintButton() {
    return (
        <Button
            variant="outline"
            size="sm"
            onClick={() => window.print()}
            title="Print Resume"
            className="gap-2"
            type="button"
        >
            <Printer className="w-4 h-4" />
            Print
        </Button>
    );
}
